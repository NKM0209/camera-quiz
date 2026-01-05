# レッスン 6: コンポーネントを理解する ⚛️

**所要時間**: 35分
**難易度**: ★★★☆☆
**前提**: レッスン1〜5を完了していること

---

## 🎯 このレッスンで学ぶこと

- Reactコンポーネントとは何か
- `StartScreen.tsx` のコードを1行ずつ読む
- Props（プロップス）でデータを渡す仕組み
- イベントハンドラの使い方

---

## 📖 コンポーネントとは？

### レゴブロックで例えると

```
大きな家を作るとき：
  ❌ 1つの巨大なブロック → 作りにくい、壊れたら全部ダメ
  ✅ 小さなブロックの組み合わせ → 作りやすい、交換できる
```

Reactも同じです！

```
Camera Quiz アプリ全体
  ├─ StartScreen コンポーネント（スタート画面）
  ├─ Question コンポーネント（問題画面）
  └─ Result コンポーネント（結果画面）
```

**各コンポーネント = 独立した部品**
- 再利用できる
- 管理しやすい
- テストしやすい

---

## 📂 StartScreen.tsx を読んでみよう

`src/components/StartScreen.tsx` の全コードを見ていきます。

### 全体構造

```typescript
import { useState } from 'react';
import { DifficultyFilter } from '../types';

interface StartScreenProps {
  onStart: (difficulty: DifficultyFilter) => void;
}

export function StartScreen({ onStart }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    <div className="start-screen">
      {/* ...HTMLっぽいコード... */}
    </div>
  );
}
```

**大きく分けて4つの部分：**
1. **import** - 必要なものを持ってくる
2. **interface** - データの型を定義
3. **関数本体** - コンポーネントのロジック
4. **return** - 画面に表示する内容

---

## 1️⃣ import - 必要なものを持ってくる

```typescript
import { useState } from 'react';
import { DifficultyFilter } from '../types';
```

### 分解して理解

```typescript
import { useState } from 'react';
```

**意味：**
- `react` という道具箱から
- `useState` という道具を持ってくる

**useState とは？**
- 「状態」を管理する道具
- 例：どの難易度が選ばれているか

---

```typescript
import { DifficultyFilter } from '../types';
```

**意味：**
- `../types` ファイルから
- `DifficultyFilter` という型定義を持ってくる

**`../` の意味：**
```
現在地: src/components/StartScreen.tsx
../     ← 1つ上の階層（srcフォルダ）へ
types   ← types.ts ファイル
```

**DifficultyFilter とは？**

`src/types.ts` を見ると：
```typescript
export type DifficultyFilter = 'all' | 1 | 2 | 3 | 4;
```

**意味：**
難易度は以下の5つのうち**どれか1つ**：
- `'all'` = すべて
- `1` = 初級
- `2` = 中級
- `3` = 上級
- `4` = 最上級

---

## 2️⃣ interface - データの型を定義

```typescript
interface StartScreenProps {
  onStart: (difficulty: DifficultyFilter) => void;
}
```

### Props（プロップス）とは？

**コンポーネントに渡すデータ**のこと。

**日常の例え：**
```
あなた：「コーヒーを淹れて」
店員：「どのサイズですか？」
あなた：「Mサイズで」← これがProps！
```

**StartScreenの場合：**
```typescript
<StartScreen onStart={関数} />
           ↑
        これがProps
```

### onStart の意味

```typescript
onStart: (difficulty: DifficultyFilter) => void;
```

**分解すると：**
```
onStart:                      名前
(difficulty: DifficultyFilter) 引数（難易度を受け取る）
=> void                       戻り値なし
```

**つまり：**
「`onStart` は**関数**で、難易度を渡すと**何かをする**」

**実際の使い方：**
```typescript
// 親コンポーネント（App.tsx）から
<StartScreen onStart={startGame} />

// startGame関数が呼ばれる
function startGame(difficulty) {
  // ゲーム開始の処理
}
```

---

## 3️⃣ 関数本体 - コンポーネントのロジック

```typescript
export function StartScreen({ onStart }: StartScreenProps) {
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');

  const handleStart = () => {
    onStart(selectedDifficulty);
  };

  return (
    // ...
  );
}
```

### export function の意味

```typescript
export function StartScreen
```

- `export` = 他のファイルから使えるようにする
- `function` = 関数
- `StartScreen` = コンポーネントの名前

### Props の受け取り

```typescript
({ onStart }: StartScreenProps)
```

**これは「分割代入」という技法：**

```typescript
// 通常の書き方
function StartScreen(props) {
  props.onStart();  // こう使う
}

// 分割代入（今回の書き方）
function StartScreen({ onStart }) {
  onStart();  // 直接使える
}
```

---

### useState - 状態管理の魔法

```typescript
const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyFilter>('all');
```

**これは何？**

**日常の例え：**
```
スイッチ（状態）
  ├─ 現在の状態: オン or オフ
  └─ 状態を変える方法: スイッチを押す
```

**コードで表すと：**
```typescript
const [状態, 状態を変える関数] = useState(初期値);
```

**実際の例：**
```typescript
const [selectedDifficulty, setSelectedDifficulty] = useState('all');
       ↑                   ↑                              ↑
    今選ばれている難易度   難易度を変える関数            最初は'all'
```

**使い方：**
```typescript
// 読み取り
console.log(selectedDifficulty);  // 'all'

// 変更
setSelectedDifficulty(1);  // 初級に変更
console.log(selectedDifficulty);  // 1
```

---

### handleStart - イベントハンドラ

```typescript
const handleStart = () => {
  onStart(selectedDifficulty);
};
```

**これは何？**
ボタンが押されたときに**実行される関数**

**ステップバイステップ：**
```
1. ユーザーがスタートボタンをクリック
     ↓
2. handleStart() が呼ばれる
     ↓
3. onStart(selectedDifficulty) を実行
     ↓
4. 親コンポーネント（App.tsx）に難易度を伝える
     ↓
5. ゲームが開始される！
```

---

## 4️⃣ return - 画面に表示する内容

```typescript
return (
  <div className="start-screen">
    <div className="film-strip top" />

    <div className="title-container">
      <div className="aperture-icon">
        <div className="aperture-blade" />
        <div className="aperture-blade" />
        {/* ...繰り返し... */}
      </div>

      <h1 className="title">
        <span className="title-main">CAMERA</span>
        <span className="title-sub">QUIZ</span>
      </h1>

      <p className="description">
        カメラと写真の雑学クイズ
      </p>
    </div>

    {/* ...難易度選択... */}

    <button className="start-button" onClick={handleStart}>
      <span className="shutter-icon" />
      START
    </button>

    <div className="film-strip bottom" />
  </div>
);
```

### JSX - HTMLっぽいけどJavaScript

これは**JSX**という特殊な文法です。

**見た目はHTML：**
```jsx
<div className="title">
  <h1>CAMERA QUIZ</h1>
</div>
```

**でも実はJavaScript：**
- 変数を埋め込める
- 条件分岐できる
- 繰り返しできる

---

### className の意味

```jsx
<div className="start-screen">
```

**HTMLでは：**
```html
<div class="start-screen">
```

**JSXでは：**
```jsx
<div className="start-screen">
```

**なぜ `className`？**
- JavaScriptでは `class` が予約語（別の意味で使われている）
- だから `className` を使う

---

### イベントハンドラの設定

```jsx
<button className="start-button" onClick={handleStart}>
  START
</button>
```

**onClick の意味：**
- クリックされたら
- `handleStart` 関数を実行

**注意！**
```jsx
onClick={handleStart}    ✅ 正しい（関数を渡す）
onClick={handleStart()}  ❌ 間違い（すぐ実行される）
```

---

## 🔄 難易度選択の仕組み

実際のコードを見てみましょう：

```jsx
<button
  className={`difficulty-option ${selectedDifficulty === 'all' ? 'selected' : ''}`}
  onClick={() => setSelectedDifficulty('all')}
>
  <span className="difficulty-label">すべて</span>
  <span className="difficulty-count">80問からランダム</span>
</button>
```

### 動的なクラス名

```jsx
className={`difficulty-option ${selectedDifficulty === 'all' ? 'selected' : ''}`}
```

**これは何？**
JavaScriptの**テンプレートリテラル**と**三項演算子**

**分解すると：**
```javascript
`difficulty-option ${条件 ? '真の場合' : '偽の場合'}`
```

**具体例：**
```javascript
// selectedDifficulty が 'all' の場合
`difficulty-option selected`

// selectedDifficulty が 1 の場合
`difficulty-option `  // selected は付かない
```

**結果：**
選ばれているボタンだけ `selected` クラスが付く！

---

### クリックで難易度を変更

```jsx
onClick={() => setSelectedDifficulty('all')}
```

**これは「アロー関数」：**
```javascript
() => { 処理 }
```

**意味：**
クリックされたら → `setSelectedDifficulty('all')` を実行

**動きの流れ：**
```
1. ユーザーが「すべて」ボタンをクリック
     ↓
2. setSelectedDifficulty('all') が実行される
     ↓
3. selectedDifficulty が 'all' に変わる
     ↓
4. 画面が自動で再描画される
     ↓
5. 「すべて」ボタンに 'selected' クラスが付く
     ↓
6. CSSで見た目が変わる（ゴールド色に）
```

---

## 🔍 データの流れを追跡

### 全体の流れ

```
┌─────────────────────────────────────────────┐
│  App.tsx（親コンポーネント）                 │
│  ┌───────────────────────────────────────┐  │
│  │ function App() {                      │  │
│  │   const { startGame } = useQuiz();    │  │
│  │                                       │  │
│  │   return (                            │  │
│  │     <StartScreen onStart={startGame}/>│  │
│  │   );                       ↓          │  │
│  │ }                          ↓          │  │
│  └────────────────────────────↓──────────┘  │
└────────────────────────────────↓────────────┘
                                ↓
┌────────────────────────────────↓────────────┐
│  StartScreen.tsx（子コンポーネント）         │
│  ┌────────────────────────────────────────┐ │
│  │ function StartScreen({ onStart }) {    │ │
│  │   const [difficulty, setDifficulty] = │ │
│  │     useState('all');                   │ │
│  │                                        │ │
│  │   const handleStart = () => {         │ │
│  │     onStart(difficulty);  ← ここで親に通知│
│  │   };                                   │ │
│  │                                        │ │
│  │   return (                             │ │
│  │     <button onClick={handleStart}>    │ │
│  │       START                            │ │
│  │     </button>                          │ │
│  │   );                                   │ │
│  │ }                                      │ │
│  └────────────────────────────────────────┘ │
└────────────────────────────────────────────┘
```

**流れ：**
1. App.tsx が `onStart={startGame}` を渡す
2. StartScreen.tsx が `onStart` として受け取る
3. ボタンクリック → `handleStart()` 実行
4. `onStart(difficulty)` → 実際には `startGame(difficulty)`
5. App.tsx でゲーム開始処理

---

## 💡 重要な概念まとめ

### Props（プロップス）
```
親から子へデータを渡す仕組み

親コンポーネント:
  <Child name="太郎" age={10} />

子コンポーネント:
  function Child({ name, age }) {
    return <p>{name}は{age}歳です</p>
  }

結果: 太郎は10歳です
```

### State（ステート）
```
コンポーネント内で変化する値

const [count, setCount] = useState(0);

count        ← 現在の値を読む
setCount(5)  ← 値を変更する
```

### イベントハンドラ
```
ユーザーの操作に反応する関数

<button onClick={関数}>クリック</button>
<input onChange={関数} />
<form onSubmit={関数}>
```

---

## 🎯 実践課題

### 初級
1. StartScreen.tsx を開いて、コメントを読む
2. `useState` がどこで使われているか探す
3. `onClick` がどこにあるか数える

### 中級
4. 「カメラと写真の雑学クイズ」を別の文に変える
5. 難易度ボタンの数を数える（いくつある？）
6. `handleStart` 関数に `console.log` を追加してみる

### 上級
7. 新しい難易度ボタンを追加してみる
8. 初期の難易度を `'all'` から `1` に変更
9. スタートボタンのテキストを「開始」に変更

---

## ✅ 理解度チェック

以下の質問に答えられますか？

- [ ] コンポーネントとは何か説明できる
- [ ] Props の役割を理解している
- [ ] useState の基本的な使い方が分かる
- [ ] onClick のようなイベントハンドラが分かる
- [ ] 親から子へデータが流れる仕組みを説明できる
- [ ] StartScreen.tsx のコードが読める

---

## 🎯 次のステップ

コンポーネントの仕組みが理解できたら、次は状態管理を深く学びましょう：

👉 [レッスン 7: 状態管理 (State)](lesson-07-state.md)

---

## 📝 復習ポイント

### 重要な用語

| 用語 | 意味 | 例 |
|------|------|-----|
| コンポーネント | 再利用可能なUI部品 | StartScreen, Question |
| Props | 親から子へ渡すデータ | `<Child name="太郎" />` |
| State | コンポーネント内の状態 | `useState('all')` |
| JSX | HTMLっぽいJavaScript | `<div>こんにちは</div>` |
| イベントハンドラ | ユーザー操作に反応 | `onClick={...}` |

---

**お疲れさまでした！⚛️**
Reactコンポーネントの仕組みが少しずつ見えてきましたね！
