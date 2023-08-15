 import axios from "axios"
 import { message } from "antd"
const baseUrl = "http://localhost:8070/api/"

// export const request = (method="",url="",data={}) => {
//     var token = "dafsdjoeijflksjeDFASFDf"
//     return axios({
//         url : baseUrl + url,
//         method : method,
//         data : data,
//         // headers: {'Content-type': 'multipart/form-data'},
//     }).then(res=>{
//         return res
//     }).catch(err=>{
//         if(err.code == "ERR_NETWORK"){
//             message.error("Can not connect to server. Plase contact administration!")
//             return false
//         }
//         return false
//     })
// }

export const request = (method = "", url = "", data = {}) => {
    var token = "dafsdjoeijflksjeDFASFDf";
    return axios({
      url: baseUrl + url,
      method: method,
      data: data,
    })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        if (axios.isAxiosError(err)) {
          // Network or server-related error
          message.error("Can not connect to server. Please contact administration!");
        } else {
          // Other types of errors
          console.log("Error occurred:", err);
        }
        return false;
      });
  };
  