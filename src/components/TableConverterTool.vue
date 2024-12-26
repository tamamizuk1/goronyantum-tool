<template>
  <v-container color="background">
    <h2>Markdown記法のテーブルをカンマ区切りに変換</h2>
    <div class="d-flex flex-row">
      <!-- Markdown形式の入力 -->
      <v-textarea
        class="my-2"
        bg-color="secondary"
        max-width="500"
        v-model="inputText"
        label="Markdown記法のテーブルのデータを入力"
        rows="6"
        clearable
      ></v-textarea>

      <!-- 変換ボタンとコピーボタン -->
      <v-container max-width="100">
        <v-row no-gutters>
          <v-col
            class="py-3 d-flex align-center justify-center fill-height"
          >
            <v-btn
              color="accent"
              class="ma-auto"
              @click="convertText"
              width="80"
            >
              変換
            </v-btn>
          </v-col>
          <v-responsive width="100%"></v-responsive>
          <v-col
            class="py-3 d-flex align-center justify-center fill-height"
          >
            <v-btn
              @click="copyToClipboard"
              color="accent"
              class="ma-auto"
              :disabled="!outputText"
              variant="tonal"
              width="80"
            >
              コピー
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <!-- 結果表示 -->
      <v-textarea
        class="my-2"
        max-width="500"
        v-model="outputText"
        label="変換されたカンマ区切りリスト"
        readonly
        rows="6"
        bg-color="secondary"
      ></v-textarea>

      <v-snackbar
        :timeout="2000"
        color="success"
        variant="tonal"
        v-model="copySuccess"
      >
        コピーしました！
      </v-snackbar>
    </div>
  </v-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'TableConverterTool',
  setup() {
    const inputText = ref('');
    const outputText = ref('');
    const copySuccess = ref(false); // コピー成功メッセージ表示用

    const convertText = () => {
      const rows = inputText.value
        .split('\n')
        .filter((row) => row.trim());
      const result = rows
        .map((row) => {
          const columns = row
            .split('|')
            .map((col) => col.trim());
          return columns[1] && columns[2]
            ? `${columns[1]} ${columns[2]}`
            : null;
        })
        .filter((item) => item)
        .join(',');
      outputText.value = result;
    };

    // クリップボードにコピー
    const copyToClipboard = async () => {
      try {
        await navigator.clipboard.writeText(
          outputText.value,
        );
        copySuccess.value = true;
        setTimeout(() => (copySuccess.value = false), 2000); // 2秒後にメッセージを非表示
      } catch (error) {
        console.error('コピーに失敗しました', error);
      }
    };

    return {
      inputText,
      outputText,
      convertText,
      copyToClipboard,
      copySuccess,
    };
  },
});
</script>

<style scoped></style>
