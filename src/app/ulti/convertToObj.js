module.exports = {
    RecordToObj: function(record) {
        return record? record.toJSON(): record
    } ,
    MultiRecordsToObj: function(records){
        return records.map(record => record.toJSON())
    }
}