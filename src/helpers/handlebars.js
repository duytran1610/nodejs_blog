const Handlebars = require('handlebars');

module.exports = {
    sum: (a,b) => a + b,
    sortable: (field, sort) => {
        const icons = {
            default: 'oi oi-elevator',
            asc: 'oi oi-sort-ascending',
            desc: 'oi oi-sort-descending'
        }
    
        const types = {
            default: 'desc',
            asc: 'desc',
            desc: 'asc'
        }
        
        let sortType = field === sort.column? sort.type : 'default';
        let icon = icons[sortType];
        let type = types[sortType];

        const href = `?_sort&column=${field}&type=${type}`;
        const output = `<a href="${href}">
                        <span class="${icon}"></span>
                    </a>`;

        return new Handlebars.SafeString(output);
    },
    tellErrol: (message) => {
        if (message){
            output = `<small class="form-text text-muted danger">${message}</small>`;
            return new Handlebars.SafeString(output);
        }
        return null;
    },
}