import {
  Component, OnInit, OnDestroy,
  EventEmitter, Output, Input
} from "@angular/core";
import {ApiService} from "../hk-api/api.service";
import {ToastService} from "../hk-providers/toast.service";

@Component({
  selector: 'hk-file-input',
  templateUrl: 'hk-file-input.component.html'
})
export class HkFileInputComponent implements OnInit {
  _preview: any;
  @Input() set preview(value: any) {
    this._preview = value;
    this.previewChange.emit(value);
  }
  @Output() previewChange: EventEmitter<any> = new EventEmitter();

  _model: any;
  @Input() set model(value: any) {
    this._model = value;
    this.modelChange.emit(this._model);
  }
  @Output() modelChange: EventEmitter<any> = new EventEmitter();

  @Input() set url(value: string) {
    this.urlChange.emit(value);
  }
  @Output() urlChange: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string;

  @Input() multiple: boolean = false;

  @Input() endpoint: string = 'uploads';

  @Input() postName: string;

  /**
   * single: Un sólo archivo.
   * row: Varios archivos en fila.
   * @type {string}
   */
  @Input() mode: string = 'single';
  @Input() children: number = 10;

  files: File[] = [];
  formData: FormData;

  loading: boolean = false;

  @Output() uploaded: EventEmitter<boolean> = new EventEmitter();

  constructor(
    private api: ApiService,
    private toast: ToastService,
  ) {
  }

  ngOnInit() {
    if (this.multiple) {
      this.postName = 'pictures[]';
    } else {
      this.postName = 'picture';
    }

    if (this._model) {
      this._preview = this._model;
    }

    this._log('mode', this.mode);
  }

  _log(...args) {
    // console.debug('[hk-file-input]', ...args);
  }

  formDataChange() {
    setTimeout(() => {
      this.uploadFiles(this.files);
    });
  }

  uploadFiles(files: File[]) {
    this._log('upload files', files, this.formData);

    this.loading = true;

    return this.api
      .post(this.endpoint, this.formData)
      .subscribe((response: any) => {
        this._log('response', response);

        this.uploaded.emit(true);

        this.preview = response.data.attributes.url;

        this.model = response.data.attributes.url;

        this.loading = false;
      }, (errors: any) => {
        this._log('errors', errors);
        this.loading = false;
        this.toast.apiError(errors);
      },
    );
  }
}
