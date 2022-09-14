<template>
  <section class="info_page_body">
    <h1>404</h1>
    <p>抱歉，找不到您要的页面</p>
    <el-button
      class="btn btn-primary"
      type="btn-primary"
      @click="$router.push('/')"
      >首页</el-button
    >
  </section>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style lang="less" scoped>
.info_page_body {
  display: flex;
  height: 100vh;
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  text-align: center;
  background-color: #fff;
  align-items: center;
  flex-flow: column;
  justify-content: center;

  h1 {
    margin-bottom: 20px;
    font-size: 70px;
  }

  p {
    margin-bottom: 80px;
    font-size: 28px;
    color: #999;
  }

  .btn {
    height: 50px;
    padding: 0 30px;
    font-size: 20px;
    line-height: 48px;
    color: #fff;
    text-decoration: none;
    border-radius: 26px;
  }

  .btn-primary {
    background-color: #1e88e5;
    border-color: #1e88e5;
  }

  .btn-primary:hover,
  .btn-primary:focus {
    background-color: #1976d2;
    border-color: #1976d2;
  }
}
</style>
