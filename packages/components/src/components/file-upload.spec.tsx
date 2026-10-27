import { newSpecPage } from '@stencil/core/testing';
import { BchFileUpload } from './file-upload';

function makeFile(name: string, size: number, type = 'text/plain'): File {
  const file = new File(['x'.repeat(size)], name, { type });
  return file;
}

describe('bch-file-upload', () => {
  it('accepts a valid file and emits bchFilesChange', async () => {
    const page = await newSpecPage({
      components: [BchFileUpload],
      html: '<bch-file-upload accept=".txt"></bch-file-upload>',
    });
    const instance = page.rootInstance as BchFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('bchFilesChange', (e: Event) =>
      spy((e as CustomEvent<File[]>).detail),
    );
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([
      makeFile('notes.txt', 10),
    ]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(page.root?.textContent).toContain('notes.txt');
  });

  it('rejects a file with a disallowed extension', async () => {
    const page = await newSpecPage({
      components: [BchFileUpload],
      html: '<bch-file-upload accept=".txt"></bch-file-upload>',
    });
    const instance = page.rootInstance as BchFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('bchFileError', (e: Event) => spy((e as CustomEvent).detail));
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([
      makeFile('photo.png', 10, 'image/png'),
    ]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
    expect(page.root?.textContent).not.toContain('photo.png');
  });

  it('rejects a file over maxSizeBytes', async () => {
    const page = await newSpecPage({
      components: [BchFileUpload],
      html: '<bch-file-upload max-size-bytes="5"></bch-file-upload>',
    });
    const instance = page.rootInstance as BchFileUpload;
    const spy = jest.fn();
    page.root?.addEventListener('bchFileError', (e: Event) => spy((e as CustomEvent).detail));
    (instance as unknown as { addFiles: (files: File[]) => void }).addFiles([
      makeFile('big.txt', 100),
    ]);
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });
});
