<template>
  <div class="review-info">
    <h2>Informasi Upload &amp; Review</h2>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="uploader" label="Uploader" width="180" />

      <el-table-column prop="status" label="Review Status" width="180" />

      <el-table-column label="Komentar Review">
        <template #default="scope">
          <el-input
            v-model="scope.row.reviewComment"
            placeholder="Tulis komentar..."
            size="small"
          />
        </template>
      </el-table-column>

      <!-- Tambah kolom lain di sini kalau perlu -->
    </el-table>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReviewInfo",
  data() {
    return {
      tableData: [],
    };
  },
  async created() {
    try {
      const res = await axios.get("http://localhost:8000/api/reviews");
      this.tableData = res.data;
    } catch (err) {
      console.error("Gagal load data review:", err);
      // fallback data dummy
      this.tableData = [
        { uploader: "user1", status: "Pending", reviewComment: "" },
        { uploader: "user2", status: "Approved", reviewComment: "OK" },
      ];
    }
  },
};
</script>

<style scoped>
.review-info {
  padding: 16px;
}
</style>
