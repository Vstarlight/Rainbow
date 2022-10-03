<template>
  <div class="footer">
    <div class="copyright">
      <div class="container">
        <p>
          <span class="mr5">Copyright © 2012-2020</span>
          <a href="https://gitee.com/lxhcool">网易云API</a>
          <span>.Designed by</span>
          <a href="https://www.lxhcool.cn" target="_blank">VGer</a>.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "fotttermain",
};
</script>

<style>
.footer {
  width: 100%;
}
.copyright {
  padding: 1.3rem 0;
  text-align: center;
}
.container {
  padding: 0;
  color: #6d7685;
  font-size: 0.8125rem;
}
a {
  color: #6d7685;
  margin-left: 5px;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  font-size: 12px;
}
a:hover {
  color: #333;
}
span {
  font-size: 12px;
}
</style>