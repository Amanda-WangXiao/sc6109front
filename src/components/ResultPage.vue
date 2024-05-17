<template>
  <div class="result-page">
    <div class="container">
      <div class="campaign-select">
        <p>Choose to see Campaign Voting Results:</p>
        <select v-model="selectedCampaign">
          <option v-for="campaign in campaigns" :key="campaign.voting_id" :value="campaign">
            {{ campaign.name }}
          </option>
        </select>
        <button @click="getCampaignResults">Check</button>
      </div>
      <div class="result-table" v-if="showResults">
        <table>
          <thead>
            <tr>
              <th>Option Name</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, index) in results" :key="index">
              <td>{{ result.optionName }}</td>
              <td>{{ result.votes }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ResultPage',
  data() {
    return {
      campaigns: [],
      selectedCampaign: null,
      results: [],
      showResults: false
    };
  },
  async created() {
    try {
      const response = await axios.get('/api/campaigns');
      console.log('Campaigns data:', response);
      this.campaigns = response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async getCampaignResults() {
      try {
        const response = await axios.get(`/api/campaign/${this.selectedCampaign.voting_id}`);
        console.log('Options data:',response )
        const { options, votes } = response.data;
        this.results = options.map((optionName, index) => ({
          optionName,
          votes: votes[index]
        }));
        this.showResults = true;
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.result-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 80%;
  margin-top: 50px; /* 添加顶部间距 */
}

.campaign-select {
  width: 45%;
  text-align: center;
}
.campaign-select select {
  width: 200px; /* 设置下拉栏的固定宽度 */
}

.campaign-select p {
  margin-bottom: 10px;
}

.result-table {
  width: 45%;
  margin-top: 30px; /* 添加顶部间距 */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}
</style>