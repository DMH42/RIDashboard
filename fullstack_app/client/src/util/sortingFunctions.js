module.exports = {
  sortNumberDec: function sortNumberDec(a, b, property, alphabeticalProperty) {
    if (a[property] && b[property]) {
      if (Number(a[property]) === Number(b[property])) {
        return this.sortStringDec(a, b, alphabeticalProperty);
      }
      if (Number(a[property]) > Number(b[property])) {
        return -1
      } else if (Number(a[property]) < Number(b[property])) {
        return 1;
      }
      // return (Number(a.dimensionsAltmetric) > Number(b.dimensionsAltmetric)) ?  -1:1 

    } else if (b[property] && !a[property]) {
      return 1;
    } else if (a[property] && !b[property]) {
      return -1;
    } else {
      return this.sortStringDec(a, b, alphabeticalProperty)
    }
  },

  sortDateDec: function sortDateDec(a, b, property, alphabeticalProperty) {
    if (a[property] && b[property]) {

      if (new Date(a[property]) > (new Date(b[property]))) {
        return -1
      } else if (new Date(a[property]) < (new Date(b[property]))) {
        return 1;
      }
      if ((new Date(a[property])).getTime() === (new Date(b[property])).getTime()) {
        return this.sortStringDec(a, b, alphabeticalProperty);
      }
      // return (Number(a.dimensionsAltmetric) > Number(b.dimensionsAltmetric)) ?  -1:1 

    } else if (b[property] && !a[property]) {
      return 1;
    } else if (a[property] && !b[property]) {
      return -1;
    } else {
      return this.sortStringDec(a, b, alphabeticalProperty)
    }
  },


  sortStringDec: function sortStringDec(a, b, property) {
    return (a[property] > b[property]) ? 1 : -1

  }
}

