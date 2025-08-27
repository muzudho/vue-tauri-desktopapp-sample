# 虫かご

例えばこう書いてたら、リアクティブが起こらない：  

```ts
    const board1AreaMax = board1FileMax * board1RankMax;
```

動的に設定を変更しても、画面に反映されない、というバグ。  

```ts
    // これが間違いで、
        for (let i = 0; i < board1AreaMax; i++) {   // 最大サイズで作っておく。

    // これが正しいというケースも。
        for (let i = 0; i < printing1AreaMax; i++) {   // 最大サイズで作っておく。
```

```plaintext
0 1 2 - 3
4 5 - 6 7
8 - 9 10 11
```

👆　みたいなやつがあれば、列数３、行数４で、 index/fileNum とするところを index/rankNum としてるかも。  

また、 index/printingWidth とすべきところで、間違えて index/boardWidth としているケースもある。  


## コピー貼り付けミス

これで、 true, false が逆になるパターン。  


## 整数型に実数を入れてしまう

割り算して Math.floor() で囲んでないとそうなることがある：  

```ts
        const fixedSquareIndex = getIndexWhenAddUpFileAndRankOnPeriodicTable(
            tileIndex,
            board1FileNum,
            board1RankNum,
            printing1Left / board1SquareWidth,
            printing1Top / board1SquareHeight
        );
        if (!Number.isInteger(fixedSquareIndex)) { throw new Error(`Assertion failed: "fixedSquareIndex" must be an integer, got ${fixedSquareIndex}`); }
```
