document.addEventListener('alpine:init', () => {
  document.documentElement.classList.add('alpine')

  Alpine.data('collection', () => ({
    artists: [],
		decades: [],
    filters: {
      year: '',
      artist: '',
    },
    records: [],
    itemsPerPage: 5,
    currentPage: 0,
    numOfPages() {
      return Math.ceil(this.filteredRecords.length / this.itemsPerPage)
    },
    page() {
      return this.filteredRecords.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
    },
    async getRecords() {
      this.records = await (await fetch('/_data/records_full.json')).json();
      this.artists = [...new Set(this.records.map(record => record.artist))].sort()
		  this.decades = [...new Set(this.records.map(record => record.year.toString().slice(0, -1)))].sort()
    },
    get filteredRecords() {
      const filtered = this.records.filter((item) => {
        for (var key in this.filters) {
          if (this.filters[key] === '') {
            continue
          }
    
          if(!String(item[key]).includes(this.filters[key])) {
            return false
          }
        }
    
        return true
      });
    
      return filtered
    },
    message() {
      return `${this.filteredRecords.length} records`;
    },
    init() {
      this.getRecords();
      this.$watch('filters', filter => this.currentPage = 0);
    }
  }))
})


// document.addEventListener('alpine:init', () => {
//     document.documentElement.classList.add('alpine')

//     Alpine.data('collection', () => ({
//       message() {
//         let message = `Page ${this.currentPage + 1} of ${this.filteredRecords.length} records`;

//         let filters = Object.entries(this.filters).map(filter => {
//           if (filter[0] === 'year' && filter[1]) {
//             filter[1] = `${filter[1]}0`
//           }
//           return filter[1]
//         }).filter(Boolean).join(', ');

//         if (filters) {
//           message += `, filtered by „${filters}“`
//         }
   
//         return message
//       },
//       get filteredRecords() {
//         const filtered = this.records.filter((item) => {
//           for (var key in this.filters) {
//             if (this.filters[key] === '') {
//               continue
//             }

//             if(!String(item[key]).includes(this.filters[key])) {
//               return false
//             }
//           }

//           return true
//         });

//         return filtered
//       },
//       artists: [],
//       decades: [],
//       filters: {
//         year: '',
//         artist: '',
//       },
//       records: [],
//       itemsPerPage: 5,
//             currentPage: 0,
//       numOfPages() {
//         return Math.ceil(this.filteredRecords.length / this.itemsPerPage)
//       },
//       page() {
//         return this.filteredRecords.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
//       },
//       async getRecords() {
//         this.records = await (await fetch('/_data/records.json')).json();
//         this.artists = [...new Set(this.records.map(record => record.artist))].sort()
//         this.decades = [...new Set(this.records.map(record => record.year.toString().slice(0, -1)))].sort()
//       },
//       init() {
//         this.getRecords();
//         this.$watch('filters', filter => this.currentPage = 0)
//       }
//     }))
//   })