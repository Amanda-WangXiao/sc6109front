
  async submitVote() {
    try {
      const response = await axios.post('http://localhost:3000/cast', {
        address: '0x4666365259838F50626bcea066B40D4HB6583B95',
        message: { option: this.selectedOption },
        campianId: this.selectedCampaign,
      });
      console.log(response.data);
      if (response.data.res === 'Voted!') {
        alert('投票成功！');
        this.votedCampaigns.push(this.selectedCampaign);
      } else {
        alert('投票失败，请重试。');
      }
    } catch (error) {
      console.error(error);
    }
  },

  address: '0x93932e9577AD79DB177aDacbA4F7cB7a7f74e123',
  voteHash: 'b60b1deb677c218dd399175d714dcf04031192fae77223207869032cc0d663bb',
  merkleProof: [
                  "0xdcb2657e04b4eb67da811e67c8ec91d3490b6fba80721c8849a8a6288b4f180b",
                  "0x1d53d71d413f3f8ee8680acb5baf4cd67b5454f2ac20caffe728fd4da23e4ed4",
                  "0x76ac6e081a01b0e8f569b735dce8697e847378772e45d4e2e81b27261578e64b",
                  "0x33131ffc6578f466800298b3e3c48c72c78b06e77e7a7f03a2c83bd6e472e348",
                  "0x5a078085284be94de290d3f8da4a6e78f14742b3110c51c52104969eb20d0e7f",
                  "0xe3df9ded8347b86845ceb7b7c7f00a44b0eab15a554306fa16c1846226d81f97",
                  "0xfd606fa7ecfedbedbc9702b772175a27decb79a7fcfb1a8309db41697c1feb66",
                  "0xe57dba52e24858c3b329db668fa622fd3cc67626fc1ff2b220aadf7af78f5059",
                  "0xcf9f8eb18d81169933ceecc386f29997adc4ef45dc77053b612dd35e41d4e1a5",
                  "0x4d432ca644c0bb99368ee1cb1a56d346b2a799a253d3857435e75a9dd7870860",
                  "0xb0b773b8d211c4edbd5708f2783ee605fa669a741868ac26751892ee53458fe3"
              ],
  merkleRoot: '0x0d8ffb0a9c323f659be30284deee43d5c25196cdec50df0bae6179d3c40b3f8d',
