import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';

export interface FileChangedEvent {
  file: File;
  url?: string;
}

@Directive({
  selector: '[fileInput]',
  exportAs: 'fileControl',
})
export class FileInputDirective {
  private inputRef!: HTMLInputElement;
  private _mime: string[] = [];

  @Output()
  fileChanged = new EventEmitter<FileChangedEvent>();

  @Output()
  error = new EventEmitter<string>();

  @Input('size')
  allowedSize: string | number = 0;

  @Input()
  set mime(listOrValue: string | string[]) {
    this._mime = Array.isArray(listOrValue) ? listOrValue : [listOrValue];
  }

  value?: File;
  fileName?: string;
  fileUrl?: string;
  isImage = false;

  constructor(private readonly elemRef: ElementRef) {
    this.inputRef = this.elemRef.nativeElement;
  }

  @HostBinding('style.display')
  get hide() {
    return !!this.value ? 'none' : 'block';
  }

  @HostListener('change', ['$event.target.files'])
  private async onFileChanged(files: FileList) {
    const file = files?.item(0);

    if (!file) {
      return;
    }

    const validationResult = this.validationFile(file);

    if (!validationResult.isValid) {
      this.clean();

      this.error.emit(validationResult.message);
    }

    this.value = file;
    this.fileName = file.name;

    this.isImage = !!file.type.match(/image\/(jpe?g|png|bmp|gif)?/);
    this.fileUrl = this.isImage ? await this.convertToURL(file) : undefined;

    this.fileChanged.emit({ file, url: this.fileUrl });
  }

  public triggerChange() {
    this.inputRef.click();
  }

  public removeFile() {
    this.clean();
  }

  private convertToURL(file: File) {
    return new Promise<string>((resolve, _reject) => {
      const fr = new FileReader();

      fr.readAsDataURL(file);

      fr.onload = () => resolve(fr.result as string);
    });
  }

  private clean() {
    this.value = undefined;
    this.inputRef.value = null as unknown as string;
    this.isImage = false;
    this.fileName = undefined;
    this.fileUrl = undefined;
  }

  validationFile(file: File) {
    const fileType = file.type;
    const fileSize = +(file.size / (1024 * 1024)).toFixed(2);

    // const isSizeValid = true;
    const isSizeValid =
      +this.allowedSize <= 0 && fileSize <= (+this.allowedSize || 0);

    if (!isSizeValid) {
      return {
        isValid: false,
        message: `Large size: Allowed size is ${this.allowedSize}`,
      };
    }

    const isMimeValid =
      this._mime.length === 0 || this._mime.some((m) => fileType.includes(m));

    if (!isMimeValid) {
      return {
        isValid: false,
        message: `Media type not allowed. Allowed type(s) ${this._mime.join(
          ', '
        )}`,
      };
    }

    return {
      isValid: true,
    };
  }
}
