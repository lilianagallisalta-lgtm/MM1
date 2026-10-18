// New copy task for font files
module.exports = {
  copyNgxDatatable: {
    src: ['{{ROOT}}/node_modules/@swimlane/ngx-datatable/release/assets/fonts/**/*'],
    dest: '{{WWW}}/build/fonts'
  }
};
