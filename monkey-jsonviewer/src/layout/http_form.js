/**
 * HTTP 请求布局
 */
export default `
<form class="httpRequest">
  <div class="requestbox">
    <select name="method">
      <option value="POST">POST</option>
      <option value="GET">GET</option>
      <option value="PUT">PUT</option>
      <option value="DELETE">DELETE</option>
      <option value="PATCH">PATCH</option>
    </select>
    <input name="url" placeholder="请求地址" />
    <select name="contentType">
      <option value="application/x-www-form-urlencoded;charset=UTF-8">urlencoded</option>
      <option value="application/json;charset=UTF-8">application/json</option>
    </select>
    <button type="submit">发送请求</button>
  </div>
  <div class="form-group">
    <label for="headers">请求头</label>
    <textarea id="headers" name="headers" placeholder='例如: {"token": "test"}'></textarea>
  </div>
  <div class="form-group">
    <label for="body">请求参数</label>
    <textarea id="body" name="params" placeholder='例如: {"name": "test"}'></textarea>
  </div>
</form>`;
