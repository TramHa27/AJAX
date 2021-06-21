function layDanhSachNhanVienApi() {
  var promise = axios({
    //Đường dẫn đến sever
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien",
    method: "GET",
    responseType: "json",
  });
  //Xử lý thành công
  promise.then(function (result) {
    //Sau khi lấy dữ liệu thành công => hiển thị ra giao diện bằng dom
    renderTableNhanVien(result.data);
  });
  //Xử lý thất bại
  promise.catch(function (error) {
    console.log("error", error);
  });
}
//Gọi hàm khi load trang
layDanhSachNhanVienApi();

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
//POST
document.querySelector("#btnThemNhanVien").onclick = function () {
  var nhanVien = new NhanVien();
  //Lấy dữ liệu từ input vào biến nhanVien
  nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
  nhanVien.chucVu = document.querySelector("#chucVu").value;
  nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVien.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
  //lấy giá trị innerHTML của thẻ option được chọn từ select
  var slChucVu = document.querySelector("#chucVu");
  //lấy ra vị trí của thẻ option được chọn từ select
  var viTriOptionChon = slChucVu.selectedIndex;
  //Hiển thị ra giao diện
  nhanVien.chucVu = slChucVu[viTriOptionChon].innerHTML;
  //Gửi dữ liệu về sever = ajax
  var promise = axios({
    url: "http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien",
    method: "POST",
    data: nhanVien,
  });
  promise.then(function (result) {
    console.log("result", result.data);
    //Khi thêm dữ liệu thành công => gọi hàm lấy danh sách nv từ sever lần nửa
    layDanhSachNhanVienApi();
  });

  promise.catch(function (error) {
    console.log("error", error.response.data);
  });
};
//DELETE
function xoaNhanVien(maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=${maNhanVien}`,
    method: "DELETE",
  });
  promise.then(function (result) {
    //Xóa thành công thì load lại table từ api
    layDanhSachNhanVienApi();
  });
  promise.catch(function (error) {
    console.log("error", error.response.data);
  });
}

//Chỉnh sửa thông tin
function chinhSua(maNhanVien) {
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=${maNhanVien}`,
    method: "GET",
  });
  promise.then(function (result) {
    var nhanVien = result.data;
    document.querySelector("#maNhanVien").value = nhanVien.maNhanVien;
    document.querySelector("#tenNhanVien").value = nhanVien.tenNhanVien;
    document.querySelector("#chucVu").value = nhanVien.chucVu;
    document.querySelector("#chucVu").value = nhanVien.heSoChucVu;
    document.querySelector("#luongCoBan").value = nhanVien.luongCoBan;
    document.querySelector("#soGioLamTrongThang").value = nhanVien.soGioLamTrongThang;
    //Đưa các giá trị từ dữ liệu lấy về lên các control input phía trên
  });
  promise.catch(function (error) {
    console.log("error", error.response.data);
  });
}

document.querySelector("#btnCapNhatThongTin").onclick = function () {
  var nhanVienUpdate = new NhanVien();
  nhanVienUpdate.maNhanVien = document.querySelector("#maNhanVien").value;
  nhanVienUpdate.tenNhanVien = document.querySelector("#tenNhanVien").value;
  nhanVienUpdate.chucVu = document.querySelector('#chucVu').value;
  nhanVienUpdate.heSoChucVu = document.querySelector("#chucVu").value;
  nhanVienUpdate.luongCoBan = document.querySelector("#luongCoBan").value;
  nhanVienUpdate.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
   //lấy giá trị innerHTML của thẻ option được chọn từ select
   var slChucVu = document.querySelector("#chucVu");
   //lấy ra vị trí của thẻ option được chọn từ select
   var viTriOptionChon = slChucVu.selectedIndex;
   //Hiển thị ra giao diện
   nhanVienUpdate.chucVu = slChucVu[viTriOptionChon].innerHTML;
  console.log('test',nhanVienUpdate);
  //Gửi dữ liệu về sever
  var promise = axios({
    url: `http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=${nhanVienUpdate.maNhanVien}`,
    method: 'PUT',
    data: nhanVienUpdate,
  })
  promise.then(function(result) {
    console.log(result.data);
    //Sau khi xử lý thành công request về api lấy dữ liệu mới về
    layDanhSachNhanVienApi();
  });

  promise.catch(function (error){
    console.log("error", error.response.data);
  })
};
