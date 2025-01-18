<template>
  <v-container color="background">
    <h2>箇条書きのレシピ材料をテーブル形式に変換</h2>
    <div class="d-flex flex-row">
      <!-- Markdown形式の入力 -->
      <v-textarea
        class="my-2"
        bg-color="secondary"
        max-width="500"
        v-model="inputText"
        label="箇条書きのレシピ材料を入力"
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
        label="変換されたテーブル形式データ"
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
  name: 'RecipeConverterTool',
  setup() {
    const inputText = ref('');
    const outputText = ref('');
    const copySuccess = ref(false); // コピー成功メッセージ表示用

    const convertText = () => {
      const lines = inputText.value.split('\n');
      const filteredLines = lines.filter(
        (line) => line !== '    ',
      );
      const table = [];
      let currentGroup = '';
      let currentLineName = '';

      for (let i = 0; i < lines.length; i++) {
        const line = filteredLines[i];

        // グループヘッダーを処理 (例: "A")
        // 行がハイフンで始まる場合、グループヘッダーとして処理し、ハイフンを取り除いてトリムした結果をcurrentGroupに格納します。
        if (/^- [A-Z]$/.test(line)) {
          currentGroup = line.replace(/^- /, '').trim();
          console.log(currentGroup);
        } else if (line) {
          // それ以外の行は材料と見なし、currentGroupが存在する場合はそれを材料名の前に付け加えます。
          // 材料と見なした行のハイフンを取り除いてトリムします
          if (/^-/.test(line)) {
            currentLineName = line.replace(/^-/, '').trim();
          } else {
            currentLineName = line.trim();
          }

          const ingredient = currentGroup
            ? `${currentGroup}：${currentLineName}`
            : currentLineName;
          // 次の行を分量として取得し、トリムした結果をquantityに格納します。次の行が存在しない場合は空文字を使用します。
          const quantity =
            filteredLines[i + 1]?.trim() || '';
          // 材料と分量のペアをtable配列に追加します。
          table.push({ ingredient, quantity });
          // 分量行をスキップするためにインデックスを1つ進めます。
          i++;
        }
      }

      // Markdownテーブルに変換
      const markdownTable = [
        '| 材料 | 分量 |',
        '| --- | --- |',
        ...table.map(
          ({ ingredient, quantity }) =>
            `| ${ingredient} | ${quantity} |`,
        ),
      ].join('\n');

      outputText.value = markdownTable;
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
