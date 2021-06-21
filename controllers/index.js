var arrNhanVien = [];
var kiemTra = new Validation();

document.querySelector("#btnThemNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
  //lấy giá trị innerHTML của thẻ option được chọn từ select
  var slChucVu = document.querySelector("#chucVu");
  //lấy ra vị trí của thẻ option được chọn từ select
  var viTriOptionChon = slChucVu.selectedIndex;
  //Hiển thị ra giao diện
  nhanVien.chucVu = slChucVu[viTriOptionChon].innerHTML;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLam = document.querySelector("#soGioLamTrongThang").value;
  //Kiểm tra dữ liệu đưa vào mảng
  //1. Kiểm tra độ dài của mã nv
  var valid = true;
  valid &= kiemTra.kiemTraDoDai(
    nhanVien.maNhanVien,
    "#error_min_max_length_maNhanVien",
    4,
    6,
    "Mã nhân viên"
  );
  //2. Kiểm tra kí tự
  valid &= kiemTra.kiemTraKyTu(
    nhanVien.tenNhanVien,
    "#error_allLetter_tenNhanVien",
    "Tên nhân viên"
  );
  //3.Kiểm tra giá trị lương cơ bản
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.luongCoBan,
    "#error_min_max_value_luongCoBan",
    1000000,
    20000000,
    "Lương Cơ Bản"
  );
  //4.Kiểm tra giá trị số giờ làm
  valid &= kiemTra.kiemTraGiaTri(
    nhanVien.soGioLamTrongThang,
    "#error_min_max_value_soGioLamTrongThang",
    50,
    150,
    "Số giờ làm"
  );
  //Đưa dữ liệu nhân viên vào mãng
  arrNhanVien.push(nhanVien);
  console.log(arrNhanVien);
  renderTableNhanVien(arrNhanVien);
};

function renderTableNhanVien(arrNv) {
  //input
  //Từ mãng arrNV tạo ra 1 chuỗi html <tr><td></td></tr>
  var content = "";
  for (var index = 0; index < arrNv.length; index++) {
    //Mỗi lần duyệt lấy ra 1 đối tượng NV
    var nv = arrNv[index];
    var nhanVien = new NhanVien();
    nhanVien.maNhanVien = nv.maNhanVien;
    nhanVien.tenNhanVien = nv.tenNhanVien;
    nhanVien.chucVu = nv.chucVu;
    nhanVien.heSoChucVu = nv.heSoChucVu;
    nhanVien.luongCoBan = nv.luongCoBan;
    nhanVien.soGioLamTrongThang = nv.soGioLamTrongThang;
    //Từ dữ liệu đó tạo ra 1 chuỗi html tr
    var trNhanVien = `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.chucVu}</td>
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.tinhTongSoLuong()}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.xepLoaiNhanVien()}</td>
            <td>
            <button onclick="xoaNhanVien('${
              nhanVien.maNhanVien
            }')" class = "btn btn-danger">Xóa</button>
            <button onclick="chinhSua('${
              nhanVien.maNhanVien
            }')" class="ml-2 btn btn-primary">Chỉnh sửa</button>           
            </td>
        </tr>
        `;
    content += trNhanVien;
  }
  //Dom đến giao diện để gán inner HTML vào
  document.querySelector("#tblNhanVien").innerHTML = content;
}

function chinhSua(maNhanVienClick) {
  for (var index = 0; index < arrNhanVien.length; index++) {
    //Mỗi lần duyệt lấy ra 1 nv
    var sv = arrNhanVien[index];
    if (sv.maNhanVien === maNhanVienClick) {
      //Load dữ liệu của nv lên giao diện
      document.querySelector("#maNhanVien").value = sv.maNhanVien;
      document.querySelector("#tenNhanVien").value = sv.tenNhanVien;
      document.querySelector("#chucVu").value = sv.chucVu;
      document.querySelector("#luongCoBan").value = sv.luongCoBan;
      document.querySelector("#soGioLamTrongThang").value = sv.soGioLamTrongThang;
    }
  }
}

//Xử lý chức năng cập nhật thông tin
document.querySelector("#btnCapNhatThongTin").onclick = function () {
  //Lấy ngược thông tin từ giao diên khi người dùng thay đổi
  var nhanVienCapNhat = new NhanVien();
  nhanVienCapNhat.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVienCapNhat.tenNhanVien = document.querySelector("#tenNhanVien").value;
  //lấy giá trị innerHTML của thẻ option được chọn từ select
  var slChucVu = document.querySelector("#chucVu");
  //lấy ra vị trí của thẻ option được chọn từ select
  var viTriOptionChon = slChucVu.selectedIndex;
  //Hiển thị ra giao diện
  nhanVienCapNhat.chucVu = slChucVu[viTriOptionChon].innerHTML;
  nhanVienCapNhat.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVienCapNhat.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
  //Duyệt mảng tìm nv có mã trùng với nv cập nhật
  for (var index = 0; index < arrNhanVien.length; index++) {
    //Mỗi lần duyệt lấy ra 1 nhân viên
    var nhanVienTrongMang = arrNhanVien[index];
    //So sánh nv trong mãng và nv người dùng cập nhật dựa vào mã nv
    if (nhanVienTrongMang.maNhanVien === nhanVienCapNhat.maNhanVien) {
      //Nếu khớp thì thay thế
      nhanVienTrongMang.tenNhanVien = nhanVienCapNhat.tenNhanVien;
      nhanVienTrongMang.chucVu = nhanVienCapNhat.chucVu;
      nhanVienTrongMang.luongCoBan = nhanVienCapNhat.luongCoBan;
      nhanVienTrongMang.soGioLamTrongThang = nhanVienCapNhat.soGioLamTrongThang;
    }
  }
  //Gọi lại hàm tạo từ bảng nv đã được cập nhật
  renderTableNhanVien(arrNhanVien);
};

function xoaNhanVien(maNVClick) {
  //Duyệt ngược để xóa những phần tử bị trùng
  for (var index = arrNhanVien.length - 1; index >= 0; index--) {
    var nhanVien = arrNhanVien[index];
    //So sánh mã nhân viên trong mãng với maNhanVien từ nút xóa
    if (nhanVien.maNhanVien === maNVClick) {
      arrNhanVien.splice(index, 1); //Xóa 1 phần tử trong mản
    }
    renderTableNhanVien(arrNhanVien);
  }
}
