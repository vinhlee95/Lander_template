/* 
	NodeAgent
*/

import request from 'superagent';

const SRV = 'http://localhost:8081'; 

export default class NodeAgent {

	request = (slug,data,callback) => {

		console.log('Fetching data from: '+SRV+slug, data);

		request
		  .post(SRV+slug)
		  .send(data)
		  .set({'Accept': 'application/json'})
		  .end(function(err,res){

		    if (res) {
			    if (callback) callback (res.body);
		    } else {
			    console.log('Error getting data:',err);
		    }

		});
	}

}