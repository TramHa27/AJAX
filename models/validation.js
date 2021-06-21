function Validation() {
  //kiểm tra độ dài của chuỗi
  this.kiemTraDoDai = function (
    value,
    selectorError,
    minLength,
    maxLength,
    name
  ) {
    if (value.length < minLength || value.length > maxLength) {
      document.querySelector(
        selectorError
      ).innerHTML = `${name} từ ${minLength} đến ${maxLength} ký tự!`;
      return false;
    }
    document.querySelector(selectorError).innerHTML = "";
    return true;
  };
  //kiểm tra ký tự
  this.kiemTraKyTu = function (value, selectorError, name) {
    var regexAllLetters = /^[A-Z a-z]+$/;

    if (regexAllLetters.test(value)) {
      document.querySelector(selectorError).innerHTML = "";
      return true;
    }
    document.querySelector(selectorError).innerHTML =
      name + " tất cả phải là ký tự !";
    return false;
  };
  //kiểm tra giá trị
  this.kiemTraGiaTri = function(value,selectorError,minValue,maxValue,name) {
    if(value < minValue || value > maxValue) {
        document.querySelector(selectorError).innerHTML = `${name} từ ${minValue} đến ${maxValue}`;
        return false;
    }
    document.querySelector(selectorError).innerHTML = '';
    return true;
}
}
