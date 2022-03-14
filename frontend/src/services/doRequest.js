const doRequest = (url,request_method,request_body,token) => {
    const headers = {
        'Content-Type':'application/json',
        'Accept':'application/json'
    }
    if(token)
        headers.Authorization = ('Bearer ' + token)
    const temp = {method: request_method, headers: headers}
    if(request_body){
        temp.body = JSON.stringify(request_body)
    }

    let response = fetch(url,temp).then((res) =>{
        if (!res.ok) {
            return res.json().then(err => Promise.reject(err));
        }
        return res.json();
    }).catch((err)=>{
        return {'error_message': err.message};
    });
    return response;
}

export default doRequest;