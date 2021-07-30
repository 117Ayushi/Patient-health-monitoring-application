import bookshelf from '../bookshelf';

const ECG_Record = bookshelf.Model.extend({
  tableName: 'ecg_record'
});


export default ECG_Record;
