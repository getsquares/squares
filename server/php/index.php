<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.1/axios.min.js"></script>
</head>
<body>
  <script>
window.addEventListener('DOMContentLoaded', (event) => {
  console.log(window.location.href);
axios.get(window.location.href + '/queries/select.php?db=jiddra&table=wp_posts&offset=3')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error.response.data);
    console.log(error.response.status);
  })
  .then(function () {
    // always executed
  });
});
  </script>
</body>
</html>