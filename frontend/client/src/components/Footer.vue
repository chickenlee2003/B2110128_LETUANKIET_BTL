<template>
  <footer class="page-footer bg-warning fixedfooter">
    <div class="container">
      <div class="row">
        <div class="col-lg-6 col-md-12">
          <h5 class="text-white">Địa chỉ</h5>
          <p class="text-muted">Phường Hưng Lợi, quận Ninh Kiều, Tp Cần Thơ</p>

          <h5 class="text-white">Chi Tiết</h5>
          <p class="text-muted">
            The Watches cung cấp các loại đồng hồ chính hãng với đầy đủ mẫu mã
            và chất lượng cao hiện đại thời trang.
          </p>
        </div>
        <div class="col-lg-3 col-md-12">
          <h5 class="text-white">Liên hệ</h5>
          <ul class="list-unstyled">
            <li><a class="text-white" href="#">Facebook</a></li>
            <li><a class="text-white" href="#">Instagram</a></li>
            <li><a class="text-white" href="#">Zalo</a></li>
            <li><a class="text-white" href="#">0349301982</a></li>
          </ul>
        </div>
        <div class="col-lg-3 col-md-12">
          <h5 class="text-white">Vận chuyển</h5>
          <ul class="list-unstyled">
            <li><a class="text-white" href="#!">Giao hàng nhanh (GHN)</a></li>
            <li><a class="text-white" href="#!">Bưu điện Việt Nam</a></li>
            <li><a class="text-white" href="#!">Viettel Post</a></li>
            <li><a class="text-white" href="#!">J&T Express</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "AppFooter",

  data() {
    return {
      page: 0,
    };
  },
};
</script>
<style>
.fixedfooter {
  /* position: absolute; */
  bottom: 0;
  left: 0;
  width: 100%;
  height: fit-content;
  color: #fff;
  padding: 10px;
  text-align: center;
  z-index: 1000;
}
</style>
