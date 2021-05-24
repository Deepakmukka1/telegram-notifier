const axios=require('axios');
configs={

  headers : {
    'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36',
    }
}

axios.get('https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=632001&date=24-05-2021',configs)
  .then(function (response) {
    // handle success
    const {sessions}=response.data;
    if(sessions.length==0)
    console.log("No sessions today");
    else
    {
      let finalData;
      sessions.map((data)=>{

        const {name,address,block_name,pincode,from,to,fee_type,available_capacity_dose1,available_capacity_dose2,available_capacity,min_age_limit,vaccine}=data;
        finalData+=`
        Center name : ${name || 'No data'}
        Center address : ${address || 'No data'}
        Block name : ${block_name || 'No data'}
        Pincode: ${pincode || 'No data'}
        Available from : ${from || 'No data'}
        Available to : ${to || 'No data'}
        Fee type : ${fee_type || 'No data'}
        Age limit : ${min_age_limit || 'No data'}
        vaccine type :${vaccine || 'No data'}
        Available amount of Dose 1 : ${available_capacity_dose1 || 'No data'}
        Available amount of Dose 2 : ${available_capacity_dose2 || 'No data'}
        Total capacity avialble : ${available_capacity || 'No data'}


        \n
        `
      })
      console.log(finalData)
    }
    // for(var i=0;i<sessions.length;i++)
    // {
    //  sessionsFinal.push(sessions[i])
    // }
    // console.log(sessionsFinal);

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })