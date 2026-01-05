# クイックリファレンス 📋

Camera Quiz開発でよく使う知識を素早く参照できるガイドです。

---

## 📁 ファイル構造

```
camera-quiz/
├── src/
│   ├── main.tsx          ← アプリの起動
│   ├── App.tsx           ← 画面切り替えの中心
│   ├── index.css         ← スタイル定義
│   ├── types.ts          ← 型定義
│   ├── components/       ← 画面コンポーネント
│   │   ├── StartScreen.tsx
│   │   ├── Question.tsx
│   │   └── Result.tsx
│   ├── data/             ← クイズデータ
│   │   └── questions.json
│   └── hooks/            ← ロジック
│       └── useQuiz.ts
├── index.html            ← エントリーポイント
└── package.json          ← 設定・依存関係
```

---

## 🎨 CSS変数（カラーパレット）

`src/index.css` の3〜17行目で定義：

```css
/* ダークテーマの色 */
--bg-dark: #1a1a1a;           /* 濃い背景 */
--bg-card: #242424;           /* カード背景 */
--bg-card-hover: #2a2a2a;     /* ホバー時 */

/* テキストの色 */
--text-primary: #f5f5f0;      /* メイン文字（明るい） */
--text-secondary: #a0a0a0;    /* サブ文字（グレー） */

/* アクセントカラー */
--accent-gold: #d4a853;       /* ゴールド */
--accent-gold-dim: #b8923f;   /* 暗めのゴールド */

/* フィードバックの色 */
--correct-green: #4a9f6e;     /* 正解の緑 */
--wrong-red: #c75d5d;         /* 不正解の赤 */

/* その他 */
--film-hole: #0d0d0d;         /* フィルムストリップの穴 */
--border-subtle: #3a3a3a;     /* 枠線 */
```

**使い方：**
```css
color: var(--text-primary);
background: var(--accent-gold);
```

---

## 📝 よく使うCSSクラス

### レイアウト・余白
```css
.container            /* メインコンテナ（最大幅520px） */
.start-screen         /* スタート画面 */
.question-screen      /* 問題画面 */
.result-screen        /* 結果画面 */
```

### ボタン
```css
.start-button         /* スタートボタン */
.next-button          /* 次へボタン */
.retry-button         /* もう一度ボタン */
.choice               /* 選択肢ボタン */
.difficulty-option    /* 難易度選択ボタン */
```

### テキスト
```css
.title-main           /* メインタイトル（CAMERA） */
.title-sub            /* サブタイトル（QUIZ） */
.description          /* 説明文 */
.question-text        /* 問題文 */
```

### 状態
```css
.selected             /* 選択中 */
.correct              /* 正解 */
.wrong                /* 不正解 */
```

---

## ⚛️ React Hooks

### useState - 状態管理

```typescript
// 基本形
const [state, setState] = useState(初期値);

// 例：難易度の管理
const [difficulty, setDifficulty] = useState<DifficultyFilter>('all');

// 読み取り
console.log(difficulty);  // 'all'

// 更新
setDifficulty(1);  // 初級に変更
```

### useQuiz - カスタムフック

```typescript
const {
  phase,              // 'start' | 'playing' | 'result'
  currentQuestion,    // 現在の問題
  currentIndex,       // 問題番号（0始まり）
  questions,          // 問題リスト
  score,              // 正解数
  selectedAnswer,     // 選択した答え
  showExplanation,    // 解説表示フラグ
  startGame,          // ゲーム開始
  selectAnswer,       // 答えを選択
  nextQuestion,       // 次の問題へ
  resetGame,          // リセット
} = useQuiz();
```

---

## 🔤 TypeScript 型定義

### Question型

```typescript
{
  question: string;      // 問題文
  choices: string[];     // 選択肢（4つ）
  answer: number;        // 正解のインデックス（0-3）
  explanation: string;   // 解説
  difficulty: 1 | 2 | 3 | 4;  // 難易度
  category: string;      // カテゴリ
}
```

### DifficultyFilter型

```typescript
type DifficultyFilter = 'all' | 1 | 2 | 3 | 4;

// 'all'  = すべて
// 1      = 初級
// 2      = 中級
// 3      = 上級
// 4      = 最上級
```

### Phase型

```typescript
type Phase = 'start' | 'playing' | 'result';

// 'start'   = スタート画面
// 'playing' = 問題画面
// 'result'  = 結果画面
```

---

## 🎯 Props一覧

### StartScreen

```typescript
interface StartScreenProps {
  onStart: (difficulty: DifficultyFilter) => void;
}

// 使用例
<StartScreen onStart={startGame} />
```

### Question

```typescript
interface QuestionProps {
  question: QuestionType;
  questionNumber: number;      // 問題番号（1始まり）
  totalQuestions: number;      // 総問題数
  selectedAnswer: number | null;
  showExplanation: boolean;
  onSelectAnswer: (index: number) => void;
  onNext: () => void;
}

// 使用例
<Question
  question={currentQuestion}
  questionNumber={currentIndex + 1}
  totalQuestions={questions.length}
  selectedAnswer={selectedAnswer}
  showExplanation={showExplanation}
  onSelectAnswer={selectAnswer}
  onNext={nextQuestion}
/>
```

### Result

```typescript
interface ResultProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
}

// 使用例
<Result
  score={score}
  totalQuestions={questions.length}
  onRetry={resetGame}
/>
```

---

## 🛠️ よく使うコマンド

### 開発サーバー起動

```bash
npm run dev
```
→ http://localhost:5173/ で確認

### ネットワーク公開（スマホで確認）

```bash
npm run dev -- --host
```
→ 同じWi-Fiのスマホからアクセス可能

### ビルド（本番用）

```bash
npm run build
```
→ `dist/` フォルダに生成

### プレビュー（ビルド後の確認）

```bash
npm run preview
```

---

## 🔍 デバッグのヒント

### console.log で値を確認

```typescript
// 変数の中身を確認
console.log('difficulty:', difficulty);

// 関数が呼ばれたか確認
const handleStart = () => {
  console.log('Start button clicked!');
  onStart(selectedDifficulty);
};

// オブジェクトの中身を見やすく表示
console.log('Question:', JSON.stringify(question, null, 2));
```

### ブラウザの開発者ツール

**開き方：**
- Windows: `F12` または `Ctrl + Shift + I`
- Mac: `Cmd + Option + I`

**便利な機能：**
- **Console**: console.logの出力、エラー確認
- **Elements**: HTML/CSS確認・一時的な編集
- **Network**: 読み込みファイルの確認
- **Sources**: ブレークポイントでデバッグ

---

## 📦 よく使うJavaScript構文

### アロー関数

```javascript
// 通常の関数
function add(a, b) {
  return a + b;
}

// アロー関数
const add = (a, b) => {
  return a + b;
};

// さらに短く（1行の場合）
const add = (a, b) => a + b;

// 引数が1つの場合
const double = x => x * 2;

// 引数なしの場合
const greet = () => console.log('Hello');
```

### 分割代入

```javascript
// 配列の分割代入
const [first, second] = ['a', 'b'];
// first = 'a', second = 'b'

// オブジェクトの分割代入
const { name, age } = { name: '太郎', age: 20 };
// name = '太郎', age = 20

// Propsの受け取り
function MyComponent({ title, onClose }) {
  // title と onClose が直接使える
}
```

### テンプレートリテラル

```javascript
const name = '太郎';
const age = 20;

// 通常の連結
console.log(name + 'は' + age + '歳です');

// テンプレートリテラル
console.log(`${name}は${age}歳です`);

// 複数行
const message = `
  こんにちは、${name}さん。
  あなたは${age}歳ですね。
`;
```

### 三項演算子

```javascript
// if文
if (score >= 80) {
  message = 'EXCELLENT!';
} else {
  message = 'GOOD!';
}

// 三項演算子
const message = score >= 80 ? 'EXCELLENT!' : 'GOOD!';

// JSXでよく使う
<div className={isSelected ? 'selected' : ''}>
```

---

## 🎨 よく使うCSSプロパティ

### レイアウト

```css
display: flex;              /* Flexboxレイアウト */
flex-direction: column;     /* 縦方向 */
flex-direction: row;        /* 横方向 */
gap: 10px;                  /* 要素間のスペース */
justify-content: center;    /* 主軸で中央揃え */
align-items: center;        /* 交差軸で中央揃え */
```

### サイズ・余白

```css
width: 200px;               /* 幅 */
max-width: 520px;           /* 最大幅 */
padding: 10px 20px;         /* 内側余白（上下 左右） */
margin: 20px;               /* 外側余白 */
```

### 文字

```css
font-size: 1.5rem;          /* 文字サイズ */
font-weight: 700;           /* 太さ */
letter-spacing: 0.1em;      /* 文字間隔 */
text-align: center;         /* 中央揃え */
color: #000000;             /* 文字色 */
```

### 背景・装飾

```css
background: #ffffff;        /* 背景色 */
border: 1px solid #ccc;     /* 枠線 */
border-radius: 5px;         /* 角丸 */
box-shadow: 0 2px 4px rgba(0,0,0,0.2);  /* 影 */
opacity: 0.8;               /* 透明度 */
```

### アニメーション

```css
transition: all 0.3s ease;  /* 変化をアニメーション */
transform: translateY(-2px); /* 移動 */
transform: scale(1.1);       /* 拡大 */
transform: rotate(90deg);    /* 回転 */
animation: fade-in 0.5s;     /* アニメーション適用 */
```

---

## 🐛 よくあるエラーと対処法

### 1. `Cannot read property 'xxx' of undefined`

**原因:** オブジェクトが存在しない
```typescript
// ❌ 問題
question.text  // question が undefined

// ✅ 解決
question?.text  // Optional chaining
if (question) question.text  // 存在確認
```

### 2. `'xxx' is not defined`

**原因:** import忘れ、スペルミス
```typescript
// ❌ 問題
useState(0)  // importしてない

// ✅ 解決
import { useState } from 'react';
```

### 3. 画面が更新されない

**原因:** 状態を直接変更している
```typescript
// ❌ 問題
difficulty = 1;  // 直接変更はダメ

// ✅ 解決
setDifficulty(1);  // setterを使う
```

### 4. CSS が反映されない

**原因:** クラス名のスペルミス、優先度
```jsx
// ❌ 問題
<div className="start-buton">  // スペルミス

// ✅ 解決
<div className="start-button">
```

---

## 📚 参考リンク

### 公式ドキュメント

- [React 公式](https://ja.react.dev/)
- [TypeScript 公式](https://www.typescriptlang.org/ja/)
- [MDN Web Docs (CSS)](https://developer.mozilla.org/ja/docs/Web/CSS)

### 学習リソース

- Camera Quiz学習ガイド: [LEARNING.md](LEARNING.md)
- レッスン1: [Web開発の全体像](lessons/lesson-01-overview.md)
- レッスン3: [CSS](lessons/lesson-03-css.md)
- レッスン6: [コンポーネント](lessons/lesson-06-components.md)

---

## 💡 Tips

### カスタマイズしやすい箇所

1. **色を変える**: `src/index.css` の `:root` 変数
2. **文字を変える**: 各コンポーネントのJSX部分
3. **問題を追加**: `src/data/questions.json`
4. **難易度を変更**: `types.ts` と各コンポーネント

### Git コマンド

```bash
# 現在の状態確認
git status

# 変更を保存
git add .
git commit -m "メッセージ"

# リモートにプッシュ
git push

# ブランチ切り替え
git checkout main
```

---

**このガイドをブックマークして、困ったときにすぐ参照できるようにしましょう！📌**
