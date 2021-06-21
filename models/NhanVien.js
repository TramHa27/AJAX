function NhanVien() {
  this.maNhanVien = "";
  this.tenNhanVien = "";
  this.chucVu = "";
  this.heSoChucVu = "";
  this.luongCoBan = "";
  this.tinhTongSoLuong = function () {
    return Number(this.luongCoBan) * Number(this.heSoChucVu);
  };
  this.xepLoaiNhanVien = function () {
    var ketQua = "";
    if (this.soGioLam >= 150) {
      ketQua = "Nhân viên xuất sắc";
    } else if (this.soGioLam >= 100 && this.soGioLam < 150) {
      ketQua = "Nhân viên giỏi";
    } else if (this.soGioLam >= 80 && this.soGioLam < 100) {
      ketQua = "Nhân viên khá";
    } else {
      ketQua = "Nhân viên trung bình";
    }
    return ketQua;
  }
}
