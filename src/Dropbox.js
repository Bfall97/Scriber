// const Dropbox = require('dropbox').Dropbox

// const handleDownloadRead = (link) => {
//     var dbx = new Dropbox({ fetch: fetch, accessToken: 
//     dbx.filesDownload({ path: link })
//       .then((response) => {
//         console.log('downloading....')
//         const blob = response.fileBlob
//         // var reader = new FileReader()
//         // reader.onloadend = function () {
//           // const dataContent = reader.result
//           // return dataContent
//         // }
//         handleRead(blob)
//         return data
//       })
//       .catch((error) => {
//         console.log(error)
//       })
// }

//    /// ------ Start file read for Markdown Parsing------//
//    const handleRead = (blob) => {
//      var reader = new FileReader()
//      reader.onloadend = function () {
//        const dataContent = reader.result
//        console.log(dataContent)
//        data = dataContent
//        reader.readAsText(blob)
//     }.bind(this)

//   }

//   const downloadFileList = (token) => {
//     var dbx = new Dropbox({
//       fetch,
//       accessToken: token
//     })
//     dbx
//       .filesListFolder({
//         path: ''
//       })
//       .then(response => {
//         return response.entries
//       })
//       .catch(error => {
//         console.log(error)
//       })
//   };


// export {
//   handleDownloadRead,
//   handleRead,
//   downloadFileList
// }