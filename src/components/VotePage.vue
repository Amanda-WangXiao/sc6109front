<template>
  <div class="vote-page">
    <div class="container">
      <div class="campaign-select">
        <p>Choose the Campaign you want to Vote：</p>
        <select v-model="selectedCampaign">
          <option v-for="campaign in campaigns" :key="campaign.voting_id" :value="campaign.voting_id" :disabled="!campaign.is_active">
            {{ campaign.name }}
          </option>
        </select>
        <button @click="fetchCampaignOptions" class="check-button">Check</button>
      </div>
      <div class="vote-options" v-if="showOptions">
        <p>Please Select：</p>
        <select v-model="selectedOption" :disabled="votedCampaigns.includes(selectedCampaign)">
          <option v-for="(option, index) in selectedCampaignOptions" :key="index" :value="option">
            {{ option }}
          </option>
        </select>
        <button @click="submitVote" class="vote-button" :disabled="votedCampaigns.includes(selectedCampaign)">Vote</button>
        <div class="verify-merkle-proof" v-if="votedCampaigns.includes(selectedCampaign)">
          <p>Verify Merkle Proof:</p>
          <button @click="verifyMerkleProof" class="verify-button">Verify</button>
          <p v-if="verifyResult !== null">Verify Result：{{ verifyResult ? 'true' : 'false' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VotePage',
  data() {
    return {
      campaigns: [],
      selectedCampaign: null,
      selectedOption: null,
      selectedCampaignOptions: [],
      showOptions: false,
      votedCampaigns: [],
      verifyResult: null,
    };
  },
  methods: {
    async fetchCampaigns() {
      try {
        const response = await axios.get('/api/campaigns');
        this.campaigns = response.data;
      } catch (error) {
        console.error(error);
      }
    },
    async fetchCampaignOptions() {
      try {
        const response = await axios.get(`/api/campaign/${this.selectedCampaign}`);
        if (response.data.options) {
          this.selectedCampaignOptions = response.data.options;
          this.showOptions = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    async submitVote() {
      try {
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const address = accounts[0];
          console.log('Your Address:'+address);
          
          const response = await axios.post('http://localhost:3000/cast', {
            address: address,
            message: {
              option: this.selectedOption,
            },
            campianId: this.selectedCampaign,
          });

          console.log(response.data);
          if (response.data.res === 'Voted!') {
            alert('Vote Success！');
            this.votedCampaigns.push(this.selectedCampaign);
          } else {
            alert('Failed, Please try again');
          }
        } else {
          alert('Please install MetaMask');
        }
      } catch (error) {
        console.error(error);
      }
    },
    async verifyMerkleProof() {
      try {
        if (typeof window.ethereum !== 'undefined') {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          const address = accounts[0];

          const response = await axios.post('http://localhost:3000/getUserVoteByCampaign', {
            address: address,
            campianId: this.selectedCampaign,
          });
          
          const { hash, merkleProof, merkleRoot } = response.data;
          console.log(response.data);
          const verifyResponse = await axios.post('http://localhost:3000/verifyMerkleProof', {
            address: address,
            voteHash: hash,
            merkleProof: merkleProof,
            merkleRoot: merkleRoot,
          });

          this.verifyResult = verifyResponse.data;
        } else {
          alert('Please install MetaMask');
        }
      } catch (error) {
        console.error(error);
      }
    },

  },
  created() {
    this.fetchCampaigns();
  },
};
</script>



<style scoped>
.vote-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container {
  display: flex;
  justify-content: center; /* 修改为 center 以使选择栏和投票页面都居中 */
  align-items: flex-start;
  width: 80%;
}

.campaign-select {
  width: 45%;
  text-align: center;
  margin-top: 30px;
  margin-right: 20px; /* 添加右边距以在选择栏和投票页面之间创建间隔 */
}

.vote-options {
  width: 45%;
  text-align: center;
  margin-top: 40px;
}

.campaign-select p,
.vote-options p {
  margin-bottom: 10px;
}

.vote-options select {
  width: 200px;
  margin-bottom: 20px;
}

.vote-button {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  font-size: 16px;
}
</style>




