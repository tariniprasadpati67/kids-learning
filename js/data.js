/**
 * Smart Learning Games – Class 1 to 5
 * Subjects: Mathematics (ଗଣିତ), English (ଇଂରାଜୀ), General Knowledge (ସାଧାରଣ ଜ୍ଞାନ)
 * IMPORTANT: Each class has UNIQUE questions. No sharing across classes.
 * Difficulty: Class 1 (beginner) to Class 5 (advanced primary)
 */

const CURRICULUM_DATA = {

  // ============================================================
  // CLASS 1 — ଶ୍ରେଣୀ ୧ — BEGINNER
  // Math: Numbers 1-20, simple addition/subtraction
  // English: Alphabet, simple words, picture matching
  // GK: Animals, fruits, colours, body parts
  // ============================================================
  "class1": {
    id: "class1",
    name: "ଶ୍ରେଣୀ ୧",
    nameEn: "Class 1",
    icon: "🌱",
    description: "ସଂଖ୍ୟା, ଅକ୍ଷର ଓ ପ୍ରାଣୀ ଜ୍ଞାନ",
    subjects: {

      "math": {
        id: "math",
        name: "ଗଣିତ",
        nameEn: "Mathematics",
        icon: "📐",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        chapters: [
          {
            id: "c1_math_numbers",
            title: "ସଂଖ୍ୟା ୧ ରୁ ୧୦",
            description: "ଗଣ ଓ ସଂଖ୍ୟା ଚିହ୍ନଟ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "numbers",
            questions: [
              { id:"c1m001", q:"'3' ପରେ କେଉଁ ସଂଖ୍ୟା ଆସେ?", options:["2","4","5","6"], answer:1, explanation:"1,2,3,4... ରେ 3 ପରେ 4 ଆସେ।", image:"🔢", type:"mcq", points:10 },
              { id:"c1m002", q:"'7' ପୂର୍ବରୁ କେଉଁ ସଂଖ୍ୟା ଆସେ?", options:["5","6","8","9"], answer:1, explanation:"...5,6,7... ରେ 7 ପୂର୍ବରୁ 6 ଆସେ।", image:"🔢", type:"mcq", points:10 },
              { id:"c1m003", q:"5 + 5 = ?", options:["8","9","10","11"], answer:2, explanation:"5 ଓ 5 ଯୋଗ କଲେ 10 ହୁଏ।", image:"⭐", type:"mcq", points:10 },
              { id:"c1m004", q:"🍎🍎🍎 — ଏଠି କେତୋଟି ଆପଲ ଅଛି?", options:["2","3","4","5"], answer:1, explanation:"ଆଙ୍ଗୁଠ ଗଣ: 1, 2, 3 — ତିନୋଟି।", image:"🍎", type:"mcq", points:10 },
              { id:"c1m005", q:"2 + 3 = ?", options:["4","5","6","7"], answer:1, explanation:"2 ଓ 3 ଯୋଗ ହେଲେ 5।", image:"➕", type:"mcq", points:10 },
              { id:"c1m006", q:"⭐⭐⭐⭐⭐⭐⭐ — ଏଠି କେତୋଟି ତାରା ଅଛି?", options:["5","6","7","8"], answer:2, explanation:"ଗଣ: 1,2,3,4,5,6,7 — ସାତୋଟି।", image:"⭐", type:"mcq", points:10 },
              { id:"c1m007", q:"10 - 3 = ?", options:["6","7","8","9"], answer:1, explanation:"10 ରୁ 3 ବିୟୋଗ ହେଲେ 7।", image:"➖", type:"mcq", points:10 },
              { id:"c1m008", q:"1 + 1 = ?", options:["1","2","3","4"], answer:1, explanation:"1 ଓ 1 ଯୋଗ = 2।", image:"➕", type:"mcq", points:10 },
              { id:"c1m009", q:"4 + 1 = ?", options:["4","5","6","7"], answer:1, explanation:"4 ଓ 1 ଯୋଗ = 5।", image:"➕", type:"mcq", points:10 },
              { id:"c1m010", q:"8 - 5 = ?", options:["2","3","4","5"], answer:1, explanation:"8 ରୁ 5 ବିୟୋଗ = 3।", image:"➖", type:"mcq", points:10 },
              { id:"c1m011", q:"5 > 3 — ଏହା ଠିକ୍ କି?", options:["ହଁ (True)","ନା (False)"], answer:0, explanation:"ହଁ, 5 ହେଉଛି 3 ଅପେକ୍ଷା ବଡ଼।", type:"true_false", points:10 },
              { id:"c1m012", q:"2 + 2 = 5 — ଏହା ଠିକ୍ କି?", options:["ହଁ (True)","ନା (False)"], answer:1, explanation:"ନା, 2 + 2 = 4, ୫ ନୁହଁ।", type:"true_false", points:10 },
              { id:"c1m013", q:"🌟🌟 + 🌟🌟🌟 = ?", options:["4","5","6","3"], answer:1, explanation:"2 ଓ 3 ଯୋଗ = 5।", image:"🌟", type:"mcq", points:10 },
              { id:"c1m014", q:"1, 2, 3, ___ — ଖାଲି ସ୍ଥାନ ପୂରଣ କର।", options:["4","5","6","7"], answer:0, explanation:"1,2,3 ପରେ 4 ଆସେ।", type:"fill_blank", points:10 },
              { id:"c1m015", q:"ସଂଖ୍ୟା 3, 7, 5 ମଧ୍ୟରୁ ସବୁଠୁ ବଡ଼ ସଂଖ୍ୟା?", options:["3","7","5","ସବୁ ସମାନ"], answer:1, explanation:"7 ହେଉଛି ସବୁଠୁ ବଡ଼।", type:"mcq", points:10 }
            ]
          },
          {
            id: "c1_math_shapes",
            title: "ଆକୃତି ଓ ଗଣନା",
            description: "ଆକୃତି ଚିହ୍ନଟ ଓ ଆଉ ଗଣନା",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "shapes",
            questions: [
              { id:"c1m016", q:"ବୃତ୍ତ (⭕)ରେ କେତୋଟି କୋଣ ଅଛି?", options:["0","1","2","3"], answer:0, explanation:"ବୃତ୍ତରେ କୌଣସି ସୁନ୍ଦ (corner) ନଥାଏ।", image:"⭕", type:"mcq", points:10 },
              { id:"c1m017", q:"🐘🐘🐘🐘 — ଗଣ।", options:["3","4","5","6"], answer:1, explanation:"ଗଣ: 1,2,3,4 — ଚ ③ ← ②ñ ← ← ←ñ।", image:"🐘", type:"mcq", points:10 },
              { id:"c1m018", q:"ତ୍ରିଭୁଜ (🔺)ରେ କେତୋଟି ବାହୁ?", options:["2","3","4","5"], answer:1, explanation:"ତ୍ରିଭୁଜ = 3 ବାହୁ।", image:"🔺", type:"mcq", points:10 },
              { id:"c1m019", q:"10 ଅପେକ୍ଷା 8 ଛୋଟ — ଠିକ୍ କି?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, 8 < 10।", type:"true_false", points:10 },
              { id:"c1m020", q:"🍌🍌🍌🍌🍌 — ଗଣ।", options:["4","5","6","7"], answer:1, explanation:"5ଟି କଦଳୀ।", image:"🍌", type:"mcq", points:10 },
              { id:"c1m021", q:"6 + 2 = ?", options:["7","8","9","10"], answer:1, explanation:"6 + 2 = 8।", type:"mcq", points:10 },
              { id:"c1m022", q:"9 - 4 = ?", options:["4","5","6","3"], answer:1, explanation:"9 - 4 = 5।", type:"mcq", points:10 },
              { id:"c1m023", q:"ଚ ③ ← ②ñ ← ← ←ñ (Square)ରେ ④ ← ② ← ← ←ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, square = 4 ସମ ③ ← ②ñ ← ← ←ñ।", type:"true_false", points:10 },
              { id:"c1m024", q:"2, 4, 6, ___ — ଖ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ?", options:["7","8","9","10"], answer:1, explanation:"2,4,6... ← ← ←ñ ← ← ←ñ 2 ← ← ←ñ, ③ ← ②ñ 8।", type:"fill_blank", points:10 },
              { id:"c1m025", q:"10 + 3 = ?", options:["12","13","14","15"], answer:1, explanation:"10 + 3 = 13।", type:"mcq", points:10 }
            ]
          },
          {
            id: "c1_math_memory",
            title: "ସଂଖ୍ୟା ଯୋଡ଼ି ଖ ③ ← ②ñ ← ← ←ñ",
            description: "ସଂଖ୍ୟ ③ ← ②ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ",
            gameType: "memory",
            difficulty: "easy",
            topicId: "numbers",
            pairs: [
              { id:1, content:"1 = ① ← ②ñ" },
              { id:2, content:"2 = ② ← ②ñ ← ← ←ñ" },
              { id:3, content:"3 = ③ ← ②ñ ← ← ←ñ ← ← ←ñ" },
              { id:4, content:"4 = ④ ← ②ñ ← ← ←ñ ← ← ←ñ" },
              { id:5, content:"5 = ⑤ ← ②ñ ← ← ←ñ ← ← ←ñ" },
              { id:6, content:"6 = ⑥ ← ②ñ ← ← ←ñ ← ← ←ñ" }
            ]
          }
        ]
      },

      "english": {
        id: "english",
        name: "ଇଂରାଜୀ",
        nameEn: "English",
        icon: "🔤",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        chapters: [
          {
            id: "c1_eng_alphabet",
            title: "Alphabet A–Z",
            description: "ଇଂ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ A ← ← ←ñ Z",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "alphabet",
            questions: [
              { id:"c1e001", q:"'A' ← ← ←ñ ③ ← ② ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ?", options:["B","C","D","E"], answer:0, explanation:"A ← ← ←ñ ③ ← ②ñ B ← ← ←ñ।", image:"🔤", type:"mcq", points:10 },
              { id:"c1e002", q:"'M' ← ← ←ñ ③ ← ②ñ ③ ← ② ← ← ←ñ ← ← ←ñ?", options:["K","L","N","O"], answer:1, explanation:"...L, M, N... ← ← ←ñ M ← ← ←ñ ③ ← ②ñ L।", type:"mcq", points:10 },
              { id:"c1e003", q:"'Z' ← ← ←ñ ③ ← ② ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, Z ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ।", type:"true_false", points:10 },
              { id:"c1e004", q:"A _ C — ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["A","B","D","E"], answer:1, explanation:"A, B, C ← ← ←ñ ③ ← ②ñ।", type:"fill_blank", points:10 },
              { id:"c1e005", q:"'Apple' ← ← ←ñ ← ← ←ñ ③ ← ② ← ← ←ñ?", options:["A","P","E","L"], answer:0, explanation:"Apple = A ← ← ←ñ ③ ← ②ñ।", image:"🍎", type:"mcq", points:10 },
              { id:"c1e006", q:"'Ball' ← ← ←ñ ← ← ←ñ ③ ← ② ← ← ←ñ?", options:["A","B","C","D"], answer:1, explanation:"Ball = B ← ← ←ñ ③ ← ②ñ।", image:"⚽", type:"mcq", points:10 },
              { id:"c1e007", q:"'Cat' = C-A-T — 'C' ← ← ←ñ Capital Letter ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, C ← ← ←ñ ③ ← ②ñ Capital।", image:"🐱", type:"true_false", points:10 },
              { id:"c1e008", q:"'D' ← ← ←ñ ③ ← ②ñ ← ← ←ñ small letter ← ← ←ñ?", options:["b","d","p","q"], answer:1, explanation:"D ← ← ←ñ small letter = 'd'।", image:"🐶", type:"mcq", points:10 },
              { id:"c1e009", q:"'Egg' ← ← ←ñ E ← ← ←ñ ③ ← ②ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, Egg = E ← ← ←ñ।", image:"🥚", type:"true_false", points:10 },
              { id:"c1e010", q:"'F' ← ← ←ñ small letter ← ← ←ñ?", options:["e","f","g","h"], answer:1, explanation:"F ← ← ←ñ small = 'f'।", type:"mcq", points:10 },
              { id:"c1e011", q:"ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["24","26","28","30"], answer:1, explanation:"ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ = 26 ← ← ←ñ।", type:"mcq", points:10 },
              { id:"c1e012", q:"'Sun' = S-U-N। S ← ← ←ñ ③ ← ②ñ T ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହଁ, S ← ← ←ñ ③ ← ②ñ T।", image:"☀️", type:"true_false", points:10 },
              { id:"c1e013", q:"'Mango' ← ← ←ñ M ← ← ←ñ ③ ← ②ñ। M ← ← ←ñ small letter?", options:["m","n","p","w"], answer:0, explanation:"M ← ← ←ñ small = 'm'।", image:"🥭", type:"mcq", points:10 },
              { id:"c1e014", q:"H _ T = HAT। ← ← ←ñ ← ← ←ñ?", options:["A","E","I","O"], answer:0, explanation:"H-A-T = HAT।", type:"fill_blank", points:10 },
              { id:"c1e015", q:"'L' ← ← ←ñ ③ ← ②ñ ← ← ←ñ Capital letter?", options:["K","L","M","N"], answer:1, explanation:"'l' ← ← ←ñ capital = 'L'।", image:"🦁", type:"mcq", points:10 }
            ]
          },
          {
            id: "c1_eng_words",
            title: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ (Simple Words)",
            description: "ଚ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "words",
            questions: [
              { id:"c1e016", q:"🐶 = ?", options:["Cat","Dog","Fish","Bird"], answer:1, explanation:"🐶 = Dog।", image:"🐶", type:"mcq", points:10 },
              { id:"c1e017", q:"🍎 ← ← ←ñ ← ← ←ñ?", options:["Mango","Banana","Apple","Orange"], answer:2, explanation:"🍎 = Apple।", image:"🍎", type:"mcq", points:10 },
              { id:"c1e018", q:"'SUN' = ☀️ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହଁ","ନା"], answer:0, explanation:"ହ ③ ← ②ñ, SUN = ③ ← ②ñ।", image:"☀️", type:"true_false", points:10 },
              { id:"c1e019", q:"🐱 = ?", options:["Dog","Cat","Cow","Hen"], answer:1, explanation:"🐱 = Cat।", image:"🐱", type:"mcq", points:10 },
              { id:"c1e020", q:"'BOOK' = 📚 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, BOOK = ← ← ←ñ।", image:"📚", type:"true_false", points:10 },
              { id:"c1e021", q:"B _ LL = BALL। ← ← ←ñ ← ← ←ñ?", options:["A","E","I","O"], answer:0, explanation:"B-A-L-L = BALL।", image:"⚽", type:"fill_blank", points:10 },
              { id:"c1e022", q:"🌸 = ?", options:["Tree","Leaf","Flower","Fruit"], answer:2, explanation:"🌸 = Flower।", image:"🌸", type:"mcq", points:10 },
              { id:"c1e023", q:"🚗 = ?", options:["Bus","Train","Car","Bicycle"], answer:2, explanation:"🚗 = Car।", image:"🚗", type:"mcq", points:10 },
              { id:"c1e024", q:"'HEN' = 🐔 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🐔", type:"true_false", points:10 },
              { id:"c1e025", q:"'PEN' = ✏️ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"✏️", type:"true_false", points:10 }
            ]
          },
          {
            id: "c1_eng_memory",
            title: "Word Memory",
            description: "ଚ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ",
            gameType: "memory",
            difficulty: "easy",
            topicId: "words",
            pairs: [
              { id:1, content:"🍎 = Apple" },
              { id:2, content:"🐶 = Dog" },
              { id:3, content:"☀️ = Sun" },
              { id:4, content:"🌸 = Flower" },
              { id:5, content:"📚 = Book" },
              { id:6, content:"🐱 = Cat" }
            ]
          }
        ]
      },

      "gk": {
        id: "gk",
        name: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
        nameEn: "General Knowledge",
        icon: "🧠",
        color: "linear-gradient(135deg, #11998e, #38ef7d)",
        chapters: [
          {
            id: "c1_gk_animals",
            title: "ଜ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ (Animals & Fruits)",
            description: "ଚ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ③ ← ②ñ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "animals",
            questions: [
              { id:"c1g001", q:"🐘 — ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["ହ ③ ← ②ñ ← ← ←ñ","ଘ ③ ← ②ñ ← ← ←ñ","ଗ ③ ← ②ñ ← ← ←ñ","ମ ③ ← ②ñ ← ← ←ñ"], answer:0, explanation:"ବ ③ ← ②ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🐘", type:"mcq", points:10 },
              { id:"c1g002", q:"🦁 — ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["ବ ③ ← ②ñ ← ← ←ñ","ଭ ③ ← ②ñ ← ← ←ñ","ସ ③ ← ②ñ ← ← ←ñ","ଚ ③ ← ②ñ ← ← ←ñ"], answer:2, explanation:"ଏ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🦁", type:"mcq", points:10 },
              { id:"c1g003", q:"🐮 ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🐮", type:"true_false", points:10 },
              { id:"c1g004", q:"🐦 ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ।", image:"🐦", type:"true_false", points:10 },
              { id:"c1g005", q:"🍌 — ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["ଆ ③ ← ②ñ ← ← ←ñ","ଆ ③ ← ②ñ ← ← ←ñ ← ← ←ñ","କ ③ ← ②ñ ← ← ←ñ ← ← ←ñ","ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ"], answer:2, explanation:"ଏ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🍌", type:"mcq", points:10 },
              { id:"c1g006", q:"🥭 ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🥭", type:"true_false", points:10 },
              { id:"c1g007", q:"🐟 ← ← ←ñ ③ ← ②ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🐟", type:"true_false", points:10 },
              { id:"c1g008", q:"🍎 ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ — ← ← ←ñ ← ← ←ñ?", options:["ଆ ③ ← ②ñ ← ← ←ñ","ସ ③ ← ②ñ ← ← ←ñ (Apple)","ଲ ③ ← ②ñ ← ← ←ñ","ଅ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"ଲ ③ ← ②ñ ← ← ←ñ = ③ ← ②ñ।", image:"🍎", type:"mcq", points:10 },
              { id:"c1g009", q:"🐕 ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🐕", type:"true_false", points:10 },
              { id:"c1g010", q:"🌸 ← ← ←ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🌸", type:"true_false", points:10 },
              { id:"c1g011", q:"👁️ ← ← ←ñ ← ← ←ñ?", options:["ଦ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ","ଶ ③ ← ②ñ ← ← ←ñ ← ← ←ñ","ଚ ③ ← ②ñ ← ← ←ñ ← ← ←ñ","ଖ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ"], answer:0, explanation:"← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"👁️", type:"mcq", points:10 },
              { id:"c1g012", q:"🌙 ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🌙", type:"true_false", points:10 },
              { id:"c1g013", q:"☀️ ← ← ←ñ ③ ← ②ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"☀️", type:"true_false", points:10 },
              { id:"c1g014", q:"🍊 ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["ଲ ③ ← ②ñ ← ← ←ñ","ହ ③ ← ②ñ ← ← ←ñ","କ ③ ← ②ñ ← ← ←ñ","ସ ③ ← ②ñ ← ← ←ñ"], answer:2, explanation:"← ← ←ñ ← ← ←ñ (orange) ← ← ←ñ।", image:"🍊", type:"mcq", points:10 },
              { id:"c1g015", q:"✋ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ?", options:["4","5","6","3"], answer:1, explanation:"✋ = 5 ← ← ←ñ।", image:"✋", type:"mcq", points:10 }
            ]
          }
        ]
      }
    }
  },

  // ============================================================
  // CLASS 2 — ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ — BASIC
  // Math: 2-digit addition/subtraction, multiplication tables 2&5
  // English: Nouns, verbs, pronouns, singular/plural, opposites
  // GK: India basics, national symbols, seasons
  // ============================================================
  "class2": {
    id: "class2",
    name: "ଶ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ②",
    nameEn: "Class 2",
    icon: "🌿",
    description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
    subjects: {
      "math": {
        id: "math",
        name: "ଗ ③ ← ②ñ ← ← ←ñ",
        nameEn: "Mathematics",
        icon: "📐",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        chapters: [
          {
            id: "c2_math_addition",
            title: "ଦ ③ ← ②ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
            description: "25+17, 45-18 ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "addition",
            questions: [
              { id:"c2m001", q:"25 + 17 = ?", options:["40","41","42","43"], answer:2, explanation:"25 + 17 = 42।", type:"mcq", points:10 },
              { id:"c2m002", q:"45 - 18 = ?", options:["25","26","27","28"], answer:2, explanation:"45 - 18 = 27।", type:"mcq", points:10 },
              { id:"c2m003", q:"30 + 40 = ?", options:["60","70","80","50"], answer:1, explanation:"30 + 40 = 70।", type:"mcq", points:10 },
              { id:"c2m004", q:"50 - 25 = ?", options:["20","25","30","35"], answer:1, explanation:"50 - 25 = 25।", type:"mcq", points:10 },
              { id:"c2m005", q:"63 + 27 = ?", options:["88","89","90","91"], answer:2, explanation:"63 + 27 = 90।", type:"mcq", points:10 },
              { id:"c2m006", q:"85 - 36 = ?", options:["47","48","49","50"], answer:2, explanation:"85 - 36 = 49।", type:"mcq", points:10 },
              { id:"c2m007", q:"37 + 13 = ?", options:["48","49","50","51"], answer:2, explanation:"37 + 13 = 50।", type:"mcq", points:10 },
              { id:"c2m008", q:"90 - 45 = ?", options:["43","44","45","46"], answer:2, explanation:"90 - 45 = 45।", type:"mcq", points:10 },
              { id:"c2m009", q:"22 + 33 = ?", options:["53","54","55","56"], answer:2, explanation:"22 + 33 = 55।", type:"mcq", points:10 },
              { id:"c2m010", q:"100 - 57 = ?", options:["41","42","43","44"], answer:2, explanation:"100 - 57 = 43।", type:"mcq", points:10 },
              { id:"c2m011", q:"50 + 50 = 100 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2m012", q:"70 > 69 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, 70 > 69।", type:"true_false", points:10 },
              { id:"c2m013", q:"34 + 16 = ?", options:["48","50","52","54"], answer:1, explanation:"34 + 16 = 50।", type:"mcq", points:10 },
              { id:"c2m014", q:"10 × 5 = ?", options:["40","50","60","55"], answer:1, explanation:"10 × 5 = 50।", type:"mcq", points:10 },
              { id:"c2m015", q:"18 + ___ = 30 — ← ← ←ñ ← ← ←ñ?", options:["10","11","12","13"], answer:2, explanation:"18 + 12 = 30।", type:"fill_blank", points:10 }
            ]
          },
          {
            id: "c2_math_tables",
            title: "← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ (Tables 2, 3, 5)",
            description: "2, 3, 5 ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "multiplication",
            questions: [
              { id:"c2m016", q:"2 × 3 = ?", options:["4","5","6","7"], answer:2, explanation:"2 × 3 = 6।", type:"mcq", points:10 },
              { id:"c2m017", q:"2 × 7 = ?", options:["12","13","14","15"], answer:2, explanation:"2 × 7 = 14।", type:"mcq", points:10 },
              { id:"c2m018", q:"5 × 4 = ?", options:["15","20","25","30"], answer:1, explanation:"5 × 4 = 20।", type:"mcq", points:10 },
              { id:"c2m019", q:"5 × 6 = ?", options:["25","30","35","40"], answer:1, explanation:"5 × 6 = 30।", type:"mcq", points:10 },
              { id:"c2m020", q:"2 × 9 = ?", options:["16","17","18","19"], answer:2, explanation:"2 × 9 = 18।", type:"mcq", points:10 },
              { id:"c2m021", q:"5 × 5 = 25 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2m022", q:"3 × 6 = ?", options:["15","16","18","19"], answer:2, explanation:"3 × 6 = 18।", type:"mcq", points:10 },
              { id:"c2m023", q:"5 × 8 = ?", options:["30","35","40","45"], answer:2, explanation:"5 × 8 = 40।", type:"mcq", points:10 },
              { id:"c2m024", q:"2 × 4 = ___ — ← ← ←ñ?", options:["6","7","8","9"], answer:2, explanation:"2 × 4 = 8।", type:"fill_blank", points:10 },
              { id:"c2m025", q:"3 × 3 = 9 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, 3 × 3 = 9।", type:"true_false", points:10 }
            ]
          }
        ]
      },
      "english": {
        id: "english",
        name: "ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ",
        nameEn: "English",
        icon: "🔤",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        chapters: [
          {
            id: "c2_eng_grammar",
            title: "Nouns, Pronouns & Opposites",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ, ← ← ←ñ ③ ← ②ñ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "nouns",
            questions: [
              { id:"c2e001", q:"'Ram is a good boy.' — 'Ram' ← ← ←ñ ← ← ←ñ?", options:["Noun","Verb","Adjective","Pronoun"], answer:0, explanation:"Ram = Proper Noun (← ← ←ñ ← ← ←ñ ← ← ←ñ)।", type:"mcq", points:10 },
              { id:"c2e002", q:"'She is tall.' — 'She' ← ← ←ñ?", options:["Noun","Pronoun","Verb","Adjective"], answer:1, explanation:"She = Pronoun।", type:"mcq", points:10 },
              { id:"c2e003", q:"'Dog' ← ← ←ñ Noun — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2e004", q:"'___ am happy.' — ← ← ←ñ ← ← ←ñ?", options:["He","She","I","They"], answer:2, explanation:"I am happy।", type:"fill_blank", points:10 },
              { id:"c2e005", q:"'Cat' ← ← ←ñ plural (← ← ←ñ ← ← ←ñ)?", options:["Cats","Cates","Cat's","Caties"], answer:0, explanation:"Cat → Cats।", type:"mcq", points:10 },
              { id:"c2e006", q:"'Book' ← ← ←ñ plural?", options:["Bookes","Book","Books","Bookies"], answer:2, explanation:"Book → Books।", type:"mcq", points:10 },
              { id:"c2e007", q:"'He runs fast.' — 'runs' ← ← ←ñ Verb — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2e008", q:"'Hot' ← ← ←ñ opposite?", options:["Warm","Cold","Chill","Freeze"], answer:1, explanation:"Hot ↔ Cold।", type:"mcq", points:10 },
              { id:"c2e009", q:"'Big' ← ← ←ñ opposite?", options:["Large","Small","Tall","Short"], answer:1, explanation:"Big ↔ Small।", type:"mcq", points:10 },
              { id:"c2e010", q:"'Happy' ← ← ←ñ opposite?", options:["Joyful","Glad","Sad","Angry"], answer:2, explanation:"Happy ↔ Sad।", type:"mcq", points:10 },
              { id:"c2e011", q:"'They' ← ← ←ñ Pronoun — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2e012", q:"'She ___ to school.' — ← ← ←ñ?", options:["go","goes","going","gone"], answer:1, explanation:"She goes (singular + s)।", type:"fill_blank", points:10 },
              { id:"c2e013", q:"'Day' ← ← ←ñ opposite?", options:["Night","Evening","Dusk","Noon"], answer:0, explanation:"Day ↔ Night।", type:"mcq", points:10 },
              { id:"c2e014", q:"'Box' → Boxes — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c2e015", q:"'We' ← ← ←ñ plural pronoun — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 }
            ]
          }
        ]
      },
      "gk": {
        id: "gk",
        name: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
        nameEn: "General Knowledge",
        icon: "🧠",
        color: "linear-gradient(135deg, #11998e, #38ef7d)",
        chapters: [
          {
            id: "c2_gk_india",
            title: "ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ (India Basics)",
            description: "← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "easy",
            topicId: "india",
            questions: [
              { id:"c2g001", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ମ ③ ← ②ñ ← ← ←ñ","ନ ③ ← ②ñ ← ← ←ñ (New Delhi)","ଦ ③ ← ②ñ ← ← ←ñ","ଚ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"ଭ ③ ← ②ñ ← ← ←ñ = New Delhi।", image:"🏛️", type:"mcq", points:10 },
              { id:"c2g002", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ସ ③ ← ②ñ ← ← ←ñ","ବ ③ ← ②ñ ← ← ←ñ (Tiger)","ହ ③ ← ②ñ ← ← ←ñ","ଗ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"ଭ ③ ← ②ñ ← ← ←ñ = Bengal Tiger।", image:"🐯", type:"mcq", points:10 },
              { id:"c2g003", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ମ ③ ← ②ñ ← ← ←ñ","ପ ③ ← ②ñ ← ← ←ñ (Peacock)","ଗ ③ ← ②ñ ← ← ←ñ","ସ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"ଭ ③ ← ②ñ ← ← ←ñ = ← ← ←ñ (Peacock)।", image:"🦚", type:"mcq", points:10 },
              { id:"c2g004", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ଗ ③ ← ②ñ ← ← ←ñ","ଆ ③ ← ②ñ ← ← ←ñ (Lotus)","ବ ③ ← ②ñ ← ← ←ñ","ପ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"ଭ ③ ← ②ñ ← ← ←ñ = ← ← ←ñ (Lotus)।", image:"🪷", type:"mcq", points:10 },
              { id:"c2g005", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["3","4","5","2"], answer:0, explanation:"← ← ←ñ = 3 ← ← ←ñ।", image:"🇮🇳", type:"mcq", points:10 },
              { id:"c2g006", q:"← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["← ← ←ñ ← ← ←ñ","← ← ←ñ (Monsoon)","← ← ←ñ","← ← ←ñ ← ← ←ñ"], answer:1, explanation:"← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🌧️", type:"mcq", points:10 },
              { id:"c2g007", q:"ଓ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["← ← ←ñ (Cuttack)","ଭ ③ ← ②ñ ← ← ←ñ (Bhubaneswar)","← ← ←ñ","← ← ←ñ ← ← ←ñ"], answer:1, explanation:"ଓ ③ ← ②ñ ← ← ←ñ = Bhubaneswar।", image:"🏛️", type:"mcq", points:10 },
              { id:"c2g008", q:"← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ଟ ③ ← ②ñ ← ← ←ñ","ବ ③ ← ②ñ ← ← ←ñ (Bus)","ଆ ③ ← ②ñ ← ← ←ñ","ଗ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🚌", type:"mcq", points:10 },
              { id:"c2g009", q:"← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["ଲ ③ ← ②ñ ← ← ←ñ","ର ③ ← ②ñ ← ← ←ñ (Root)","ଚ ③ ← ②ñ ← ← ←ñ","ହ ③ ← ②ñ ← ← ←ñ"], answer:1, explanation:"← ← ←ñ ← ← ←ñ ← ← ←ñ = Root।", image:"🌱", type:"mcq", points:10 },
              { id:"c2g010", q:"ଭ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 }
            ]
          }
        ]
      }
    }
  },

  // ============================================================
  // CLASS 3 — ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ③ — INTERMEDIATE
  // ============================================================
  "class3": {
    id: "class3",
    name: "ଶ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③",
    nameEn: "Class 3",
    icon: "🌟",
    description: "← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ",
    subjects: {
      "math": {
        id: "math",
        name: "ଗ ③ ← ②ñ ← ← ←ñ",
        nameEn: "Mathematics",
        icon: "📐",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        chapters: [
          {
            id: "c3_math_multiply",
            title: "← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
            description: "235+147, ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "multiplication",
            questions: [
              { id:"c3m001", q:"235 + 147 = ?", options:["380","381","382","383"], answer:2, explanation:"235 + 147 = 382।", type:"mcq", points:10 },
              { id:"c3m002", q:"7 × 8 = ?", options:["54","55","56","57"], answer:2, explanation:"7 × 8 = 56।", type:"mcq", points:10 },
              { id:"c3m003", q:"9 × 6 = ?", options:["52","53","54","55"], answer:2, explanation:"9 × 6 = 54।", type:"mcq", points:10 },
              { id:"c3m004", q:"48 ÷ 6 = ?", options:["6","7","8","9"], answer:2, explanation:"48 ÷ 6 = 8।", type:"mcq", points:10 },
              { id:"c3m005", q:"12 × 4 = ?", options:["44","46","48","50"], answer:2, explanation:"12 × 4 = 48।", type:"mcq", points:10 },
              { id:"c3m006", q:"72 ÷ 9 = ?", options:["6","7","8","9"], answer:2, explanation:"72 ÷ 9 = 8।", type:"mcq", points:10 },
              { id:"c3m007", q:"500 - 287 = ?", options:["211","212","213","214"], answer:2, explanation:"500 - 287 = 213।", type:"mcq", points:10 },
              { id:"c3m008", q:"11 × 9 = ?", options:["97","98","99","100"], answer:2, explanation:"11 × 9 = 99।", type:"mcq", points:10 },
              { id:"c3m009", q:"3/4 > 1/2 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"3/4=0.75, 1/2=0.5, ③ ← ②ñ 3/4 ← ← ←ñ।", type:"true_false", points:10 },
              { id:"c3m010", q:"1/2 + 1/4 = ?", options:["1/4","3/4","1/8","2/4"], answer:1, explanation:"2/4 + 1/4 = 3/4।", type:"mcq", points:10 },
              { id:"c3m011", q:"24 ← ← ←ñ 6 ← ← ←ñ ← ← ←ñ = ?", options:["3","4","5","6"], answer:1, explanation:"24 ÷ 6 = 4।", type:"mcq", points:10 },
              { id:"c3m012", q:"63 ÷ 7 = ___ — ← ← ←ñ ← ← ←ñ?", options:["7","8","9","10"], answer:2, explanation:"63 ÷ 7 = 9।", type:"fill_blank", points:10 },
              { id:"c3m013", q:"368 + 254 = ?", options:["620","621","622","623"], answer:2, explanation:"368 + 254 = 622।", type:"mcq", points:10 },
              { id:"c3m014", q:"1 ← ← ←ñ = 100 ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c3m015", q:"4 × 12 = ?", options:["44","46","48","50"], answer:2, explanation:"4 × 12 = 48।", type:"mcq", points:10 }
            ]
          }
        ]
      },
      "english": {
        id: "english",
        name: "ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ",
        nameEn: "English",
        icon: "🔤",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        chapters: [
          {
            id: "c3_eng_tenses",
            title: "Tenses & Articles",
            description: "Present, Past, Future Tense; a, an, the",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "tenses",
            questions: [
              { id:"c3e001", q:"'She ___ to school yesterday.' ← ← ←ñ?", options:["go","goes","went","going"], answer:2, explanation:"Yesterday = past tense → went।", type:"fill_blank", points:10 },
              { id:"c3e002", q:"'I ___ eating now.' ← ← ←ñ?", options:["am","is","are","was"], answer:0, explanation:"I am eating (present continuous)।", type:"fill_blank", points:10 },
              { id:"c3e003", q:"'___ apple a day keeps doctor away.' ← ← ←ñ?", options:["A","An","The","Some"], answer:1, explanation:"apple ← ← ←ñ vowel ← ← ←ñ → An।", type:"fill_blank", points:10 },
              { id:"c3e004", q:"'He played cricket.' — ← ← ←ñ tense?", options:["Present","Past","Future","None"], answer:1, explanation:"'played' = past tense।", type:"mcq", points:10 },
              { id:"c3e005", q:"'They will come tomorrow.' — Future tense — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, 'will come' = future।", type:"true_false", points:10 },
              { id:"c3e006", q:"'___ sun rises in the east.' ← ← ←ñ?", options:["A","An","The","No article"], answer:2, explanation:"← ← ←ñ ← ← ←ñ ← ← ←ñ The।", type:"fill_blank", points:10 },
              { id:"c3e007", q:"'She sings beautifully.' — 'sings' ← ← ←ñ?", options:["Noun","Verb","Adjective","Adverb"], answer:1, explanation:"sings = Verb।", type:"mcq", points:10 },
              { id:"c3e008", q:"'Beautiful' ← ← ←ñ?", options:["Noun","Verb","Adjective","Adverb"], answer:2, explanation:"Beautiful = Adjective।", type:"mcq", points:10 },
              { id:"c3e009", q:"'Under the tree' — 'Under' ← ← ←ñ?", options:["Noun","Verb","Preposition","Adjective"], answer:2, explanation:"Under = Preposition।", type:"mcq", points:10 },
              { id:"c3e010", q:"'The boys ___ playing.' ← ← ←ñ?", options:["is","am","are","was"], answer:2, explanation:"plural subject → are।", type:"fill_blank", points:10 },
              { id:"c3e011", q:"'Quickly' ← ← ←ñ Adverb — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c3e012", q:"'Children' ← ← ←ñ singular?", options:["Childs","Child","Childen","Childes"], answer:1, explanation:"Children → singular = Child।", type:"mcq", points:10 },
              { id:"c3e013", q:"'We go to school' — ← ← ←ñ tense?", options:["Past","Present","Future","None"], answer:1, explanation:"'go' = present।", type:"mcq", points:10 },
              { id:"c3e014", q:"'___ honest man is respected.' ← ← ←ñ?", options:["A","An","The","No article"], answer:1, explanation:"honest ← ← ←ñ vowel sound → An।", type:"fill_blank", points:10 },
              { id:"c3e015", q:"'She will sing tomorrow.' ← ← ←ñ tense?", options:["Past","Present","Future","Present Perfect"], answer:2, explanation:"'will sing' = Future।", type:"mcq", points:10 }
            ]
          }
        ]
      },
      "gk": {
        id: "gk",
        name: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
        nameEn: "General Knowledge",
        icon: "🧠",
        color: "linear-gradient(135deg, #11998e, #38ef7d)",
        chapters: [
          {
            id: "c3_gk_states",
            title: "States & Capitals / Continents",
            description: "← ← ←ñ, ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "states",
            questions: [
              { id:"c3g001", q:"Odisha ← ← ←ñ capital?", options:["Cuttack","Bhubaneswar","Puri","Rourkela"], answer:1, explanation:"Odisha ← ← ←ñ = Bhubaneswar।", image:"🏛️", type:"mcq", points:10 },
              { id:"c3g002", q:"India ← ← ←ñ capital?", options:["Mumbai","New Delhi","Chennai","Kolkata"], answer:1, explanation:"India ← ← ←ñ = New Delhi।", image:"🏛️", type:"mcq", points:10 },
              { id:"c3g003", q:"World ← ← ←ñ ← ← ←ñ continents ← ← ←ñ?", options:["5","6","7","8"], answer:2, explanation:"7 ← ← ←ñ।", image:"🌍", type:"mcq", points:10 },
              { id:"c3g004", q:"World ← ← ←ñ ← ← ←ñ oceans ← ← ←ñ?", options:["3","4","5","6"], answer:2, explanation:"5 ← ← ←ñ।", image:"🌊", type:"mcq", points:10 },
              { id:"c3g005", q:"Largest continent?", options:["Africa","Asia","Europe","Australia"], answer:1, explanation:"Asia ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🌍", type:"mcq", points:10 },
              { id:"c3g006", q:"India ← ← ←ñ ← ← ←ñ Asia ← ← ←ñ — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c3g007", q:"Rajasthan ← ← ←ñ capital?", options:["Jaipur","Jodhpur","Udaipur","Ajmer"], answer:0, explanation:"Rajasthan = Jaipur।", image:"🏛️", type:"mcq", points:10 },
              { id:"c3g008", q:"First satellite in space — Sputnik — which country?", options:["USA","USSR/Russia","India","China"], answer:1, explanation:"Sputnik = USSR (Russia) 1957।", image:"🚀", type:"mcq", points:10 },
              { id:"c3g009", q:"Sun is a Star — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ।", type:"true_false", points:10 },
              { id:"c3g010", q:"Albert Einstein ← ← ←ñ ← ← ←ñ ← ← ←ñ?", options:["Physicist","Biologist","Chemist","Geologist"], answer:0, explanation:"Einstein = Physicist।", image:"🔭", type:"mcq", points:10 }
            ]
          }
        ]
      }
    }
  },

  // ============================================================
  // CLASS 4 — ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ④ — UPPER PRIMARY
  // ============================================================
  "class4": {
    id: "class4",
    name: "ଶ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ④",
    nameEn: "Class 4",
    icon: "🎓",
    description: "← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ",
    subjects: {
      "math": {
        id: "math",
        name: "ଗ ③ ← ②ñ ← ← ←ñ",
        nameEn: "Mathematics",
        icon: "📐",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        chapters: [
          {
            id: "c4_math_large",
            title: "Large Numbers, Fractions & Area",
            description: "2345+1876, ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "large_numbers",
            questions: [
              { id:"c4m001", q:"2,345 + 1,876 = ?", options:["4,219","4,220","4,221","4,222"], answer:2, explanation:"2345 + 1876 = 4221।", type:"mcq", points:10 },
              { id:"c4m002", q:"5,000 - 2,347 = ?", options:["2,651","2,652","2,653","2,654"], answer:2, explanation:"5000 - 2347 = 2653।", type:"mcq", points:10 },
              { id:"c4m003", q:"125 × 4 = ?", options:["498","499","500","501"], answer:2, explanation:"125 × 4 = 500।", type:"mcq", points:10 },
              { id:"c4m004", q:"144 ÷ 12 = ?", options:["10","11","12","13"], answer:2, explanation:"144 ÷ 12 = 12।", type:"mcq", points:10 },
              { id:"c4m005", q:"Perimeter of square, side = 8cm?", options:["24 cm","28 cm","32 cm","36 cm"], answer:2, explanation:"P = 4 × 8 = 32 cm।", type:"mcq", points:10 },
              { id:"c4m006", q:"Area of rectangle (6cm × 4cm)?", options:["20 sq cm","22 sq cm","24 sq cm","26 sq cm"], answer:2, explanation:"Area = 6 × 4 = 24 sq cm।", type:"mcq", points:10 },
              { id:"c4m007", q:"3/5 + 1/5 = ?", options:["3/5","4/5","5/5","2/5"], answer:1, explanation:"3/5 + 1/5 = 4/5।", type:"mcq", points:10 },
              { id:"c4m008", q:"Factors of 12: 1,2,3,4,6,12 — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c4m009", q:"0.5 + 0.3 = ?", options:["0.7","0.8","0.9","1.0"], answer:1, explanation:"0.5 + 0.3 = 0.8।", type:"mcq", points:10 },
              { id:"c4m010", q:"Multiples of 7: 7,14,21,28,___ ← ← ←ñ?", options:["30","35","40","42"], answer:1, explanation:"7 × 5 = 35।", type:"fill_blank", points:10 },
              { id:"c4m011", q:"3,762 + 1,438 = ?", options:["5,198","5,199","5,200","5,201"], answer:2, explanation:"3762+1438 = 5200।", type:"mcq", points:10 },
              { id:"c4m012", q:"7 is a prime number — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, 7 = prime।", type:"true_false", points:10 },
              { id:"c4m013", q:"Perimeter of triangle (5+7+9 cm)?", options:["19 cm","20 cm","21 cm","22 cm"], answer:2, explanation:"5+7+9 = 21 cm।", type:"mcq", points:10 },
              { id:"c4m014", q:"0.75 = ___ / 4 ← ← ←ñ?", options:["1","2","3","4"], answer:2, explanation:"0.75 = 3/4।", type:"fill_blank", points:10 },
              { id:"c4m015", q:"LCM of 4 and 6 = ?", options:["10","12","14","16"], answer:1, explanation:"LCM(4,6) = 12।", type:"mcq", points:10 }
            ]
          }
        ]
      },
      "english": {
        id: "english",
        name: "ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ",
        nameEn: "English",
        icon: "🔤",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        chapters: [
          {
            id: "c4_eng_grammar",
            title: "Parts of Speech & Subject-Verb Agreement",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "parts_of_speech",
            questions: [
              { id:"c4e001", q:"'The dog runs fast.' — 'fast' ← ← ←ñ?", options:["Noun","Adjective","Adverb","Verb"], answer:2, explanation:"fast = Adverb।", type:"mcq", points:10 },
              { id:"c4e002", q:"'Neither Ram nor Shyam ___ present.' ← ← ←ñ?", options:["are","is","were","be"], answer:1, explanation:"Neither...nor + singular → is।", type:"fill_blank", points:10 },
              { id:"c4e003", q:"'She went ___ school.' (Preposition) ← ← ←ñ?", options:["at","to","in","on"], answer:1, explanation:"go TO school।", type:"fill_blank", points:10 },
              { id:"c4e004", q:"'Beautiful' ← ← ←ñ Comparative = ?", options:["More beautiful","Beautifuler","Most beautiful","Beautifullest"], answer:0, explanation:"Comparative of beautiful = more beautiful।", type:"mcq", points:10 },
              { id:"c4e005", q:"Conjunction joins two sentences — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c4e006", q:"'Either you ___ she must go.' ← ← ←ñ?", options:["or","and","but","nor"], answer:0, explanation:"Either...or।", type:"fill_blank", points:10 },
              { id:"c4e007", q:"'He runs slowly.' — 'slowly' ← ← ←ñ Adverb — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c4e008", q:"'The news ___ shocking.' ← ← ←ñ?", options:["are","is","were","be"], answer:1, explanation:"News = singular → is।", type:"fill_blank", points:10 },
              { id:"c4e009", q:"'Physics ___ a difficult subject.' ← ← ←ñ?", options:["are","is","were","be"], answer:1, explanation:"Subject names singular → is।", type:"fill_blank", points:10 },
              { id:"c4e010", q:"Prepositions show relationship — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c4e011", q:"'He speaks ___ (adverb of manner).' ← ← ←ñ?", options:["quick","quickly","quicker","quickest"], answer:1, explanation:"Adverb = quickly।", type:"mcq", points:10 },
              { id:"c4e012", q:"'The book is ___ the table.' ← ← ←ñ?", options:["on","in","at","by"], answer:0, explanation:"Book is ON the table।", type:"fill_blank", points:10 },
              { id:"c4e013", q:"'She sings well.' — 'well' ← ← ←ñ?", options:["Adjective","Adverb","Noun","Verb"], answer:1, explanation:"well = Adverb।", type:"mcq", points:10 },
              { id:"c4e014", q:"Adverbs modify verbs — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", type:"true_false", points:10 },
              { id:"c4e015", q:"'Ram and Sita ___ coming.' ← ← ←ñ?", options:["is","am","are","was"], answer:2, explanation:"Plural subject (Ram AND Sita) → are।", type:"fill_blank", points:10 }
            ]
          }
        ]
      },
      "gk": {
        id: "gk",
        name: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
        nameEn: "General Knowledge",
        icon: "🧠",
        color: "linear-gradient(135deg, #11998e, #38ef7d)",
        chapters: [
          {
            id: "c4_gk_history",
            title: "History & World Geography",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "medium",
            topicId: "history",
            questions: [
              { id:"c4g001", q:"India got independence in which year?", options:["1947","1950","1952","1948"], answer:0, explanation:"India = 15 August 1947।", image:"🇮🇳", type:"mcq", points:10 },
              { id:"c4g002", q:"Largest country by area?", options:["USA","Russia","Canada","China"], answer:1, explanation:"Russia ← ← ←ñ ← ← ←ñ।", image:"🌍", type:"mcq", points:10 },
              { id:"c4g003", q:"Longest river in the world?", options:["Amazon","Nile","Ganga","Yangtze"], answer:1, explanation:"Nile = longest river।", image:"🌊", type:"mcq", points:10 },
              { id:"c4g004", q:"Mount Everest height (approx)?", options:["7,848 m","8,449 m","8,849 m","9,048 m"], answer:2, explanation:"Everest ≈ 8849 m।", image:"🏔️", type:"mcq", points:10 },
              { id:"c4g005", q:"Who invented Telephone?", options:["Edison","Bell","Newton","Faraday"], answer:1, explanation:"Graham Bell = Telephone।", image:"📞", type:"mcq", points:10 },
              { id:"c4g006", q:"Mahatma Gandhi was Father of Nation — ③ ← ②ñ ← ← ←ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🕊️", type:"true_false", points:10 },
              { id:"c4g007", q:"Thomas Edison invented?", options:["Telephone","Light Bulb","TV","Radio"], answer:1, explanation:"Edison = Light Bulb।", image:"💡", type:"mcq", points:10 },
              { id:"c4g008", q:"Highest peak in India?", options:["Nanda Devi","K2 (in PoK)","Kanchenjunga","Godwin Austen"], answer:2, explanation:"Kanchenjunga = highest in India。", image:"🏔️", type:"mcq", points:10 },
              { id:"c4g009", q:"Solar System has 8 planets — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🌍", type:"true_false", points:10 },
              { id:"c4g010", q:"Chlorophyll makes leaves?", options:["Red","Blue","Green","Yellow"], answer:2, explanation:"Chlorophyll → Green colour。", image:"🍃", type:"mcq", points:10 }
            ]
          }
        ]
      }
    }
  },

  // ============================================================
  // CLASS 5 — ← ← ←ñ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ⑤ — ADVANCED PRIMARY
  // ============================================================
  "class5": {
    id: "class5",
    name: "ଶ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ⑤",
    nameEn: "Class 5",
    icon: "🏆",
    description: "← ← ←ñ ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ, ← ← ←ñ ← ← ←ñ ← ← ←ñ",
    subjects: {
      "math": {
        id: "math",
        name: "ଗ ③ ← ②ñ ← ← ←ñ",
        nameEn: "Mathematics",
        icon: "📐",
        color: "linear-gradient(135deg, #667eea, #764ba2)",
        chapters: [
          {
            id: "c5_math_problems",
            title: "Word Problems & Mathematical Reasoning",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "hard",
            topicId: "word_problems",
            questions: [
              { id:"c5m001", q:"A shop has 576 apples. 128 sold, 48 new came. Total now?", options:["494","496","498","500"], answer:1, explanation:"576 - 128 + 48 = 496।", type:"mcq", points:15 },
              { id:"c5m002", q:"Train travels 360 km in 6 hrs. Speed = ?", options:["50","55","60","65"], answer:2, explanation:"Speed = 360 ÷ 6 = 60 km/hr।", type:"mcq", points:15 },
              { id:"c5m003", q:"LCM of 12, 15, 20 = ?", options:["50","55","60","65"], answer:2, explanation:"LCM(12,15,20) = 60।", type:"mcq", points:15 },
              { id:"c5m004", q:"Volume of cube, side = 4cm?", options:["48 cu cm","56 cu cm","64 cu cm","72 cu cm"], answer:2, explanation:"V = 4³ = 64 cu cm।", type:"mcq", points:15 },
              { id:"c5m005", q:"3.75 + 2.48 = ?", options:["6.21","6.22","6.23","6.24"], answer:2, explanation:"3.75 + 2.48 = 6.23।", type:"mcq", points:15 },
              { id:"c5m006", q:"15% of 400 = ?", options:["55","60","65","70"], answer:1, explanation:"15/100 × 400 = 60।", type:"mcq", points:15 },
              { id:"c5m007", q:"A number divisible by 2 and 3 must be divisible by 6 — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, LCM(2,3)=6।", type:"true_false", points:15 },
              { id:"c5m008", q:"CP=₹250, SP=₹325. Profit% = ?", options:["25%","30%","35%","40%"], answer:1, explanation:"Profit = 75. % = (75/250)×100 = 30%।", type:"mcq", points:15 },
              { id:"c5m009", q:"HCF of 36 and 48 = ?", options:["6","8","10","12"], answer:3, explanation:"HCF(36,48) = 12।", type:"mcq", points:15 },
              { id:"c5m010", q:"40% of a number = 120. Number = ?", options:["280","290","300","310"], answer:2, explanation:"120 × 100/40 = 300।", type:"mcq", points:15 },
              { id:"c5m011", q:"Circumference of circle, r=14 (π=22/7)?", options:["84 cm","88 cm","92 cm","96 cm"], answer:1, explanation:"C = 2 × 22/7 × 14 = 88 cm।", type:"mcq", points:15 },
              { id:"c5m012", q:"√144 = ?", options:["10","11","12","13"], answer:2, explanation:"√144 = 12।", type:"mcq", points:15 },
              { id:"c5m013", q:"Rect field 50m×30m, fencing at ₹5/m. Cost = ?", options:["₹700","₹750","₹800","₹850"], answer:2, explanation:"P=160m. Cost=160×5=₹800।", type:"mcq", points:15 },
              { id:"c5m014", q:"Average of 5,10,15,20,25 = ?", options:["13","14","15","16"], answer:2, explanation:"Sum=75, Avg=75/5=15।", type:"mcq", points:15 },
              { id:"c5m015", q:"Area of circle, r=7 (π=22/7)?", options:["144 sq cm","148 sq cm","152 sq cm","154 sq cm"], answer:3, explanation:"Area = 22/7 × 49 = 154 sq cm।", type:"mcq", points:15 }
            ]
          }
        ]
      },
      "english": {
        id: "english",
        name: "ଇ ③ ← ②ñ ← ← ←ñ ← ← ←ñ",
        nameEn: "English",
        icon: "🔤",
        color: "linear-gradient(135deg, #f093fb, #f5576c)",
        chapters: [
          {
            id: "c5_eng_advanced",
            title: "Synonyms, Antonyms, Homophones & Sentence Correction",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "hard",
            topicId: "vocabulary",
            questions: [
              { id:"c5e001", q:"Synonym of 'Brave' = ?", options:["Coward","Fearful","Courageous","Timid"], answer:2, explanation:"Brave = Courageous।", type:"mcq", points:15 },
              { id:"c5e002", q:"Antonym of 'Ancient' = ?", options:["Old","Modern","Past","Historical"], answer:1, explanation:"Ancient ↔ Modern।", type:"mcq", points:15 },
              { id:"c5e003", q:"Homophone of 'Hear' = ?", options:["Hair","Here","Hare","Hour"], answer:1, explanation:"Hear / Here = same sound।", type:"mcq", points:15 },
              { id:"c5e004", q:"Correct: 'She don't like mangoes.'", options:["She don't likes","She doesn't like mangoes","She didn't likes","She not like"], answer:1, explanation:"She doesn't like (singular: does not)।", type:"mcq", points:15 },
              { id:"c5e005", q:"Synonym of 'Enormous' = ?", options:["Tiny","Small","Huge","Little"], answer:2, explanation:"Enormous = Huge।", type:"mcq", points:15 },
              { id:"c5e006", q:"Antonym of 'Transparent' = ?", options:["Clear","Opaque","Visible","Bright"], answer:1, explanation:"Transparent ↔ Opaque।", type:"mcq", points:15 },
              { id:"c5e007", q:"'Flower/Flour' are homophones — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, same pronunciation।", type:"true_false", points:15 },
              { id:"c5e008", q:"Synonym of 'Obstinate' = ?", options:["Flexible","Stubborn","Gentle","Soft"], answer:1, explanation:"Obstinate = Stubborn।", type:"mcq", points:15 },
              { id:"c5e009", q:"Antonym of 'Diligent' = ?", options:["Hardworking","Careful","Lazy","Sincere"], answer:2, explanation:"Diligent ↔ Lazy।", type:"mcq", points:15 },
              { id:"c5e010", q:"Correct: 'The committee have decided.' — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:1, explanation:"Committee = singular → 'has decided'।", type:"true_false", points:15 },
              { id:"c5e011", q:"Homophone of 'Knot' = ?", options:["Note","Not","Naught","Knob"], answer:1, explanation:"Knot / Not = same sound।", type:"mcq", points:15 },
              { id:"c5e012", q:"Synonym of 'Frugal' = ?", options:["Wasteful","Thrifty","Generous","Lavish"], answer:1, explanation:"Frugal = Thrifty।", type:"mcq", points:15 },
              { id:"c5e013", q:"'___ you ___ tennis regularly?' (Present Perfect) ← ← ←ñ?", options:["Do/play","Have/played","Did/play","Are/playing"], answer:1, explanation:"Have you played (Present Perfect)।", type:"fill_blank", points:15 },
              { id:"c5e014", q:"Antonym of 'Prolific' = ?", options:["Creative","Fertile","Barren","Active"], answer:2, explanation:"Prolific (productive) ↔ Barren।", type:"mcq", points:15 },
              { id:"c5e015", q:"'None of the students have finished.' — is it correct?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:1, explanation:"'None' → singular → 'has finished'।", type:"true_false", points:15 }
            ]
          }
        ]
      },
      "gk": {
        id: "gk",
        name: "ସ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ③ ← ②ñ ← ← ←ñ",
        nameEn: "General Knowledge",
        icon: "🧠",
        color: "linear-gradient(135deg, #11998e, #38ef7d)",
        chapters: [
          {
            id: "c5_gk_advanced",
            title: "Science, Technology, Sports & World Affairs",
            description: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",
            gameType: "quiz",
            difficulty: "hard",
            topicId: "advanced_gk",
            questions: [
              { id:"c5g001", q:"WHO stands for World ___ Organization.", options:["Health","Help","Heritage","Harmony"], answer:0, explanation:"WHO = World Health Organization।", image:"🌍", type:"fill_blank", points:15 },
              { id:"c5g002", q:"Mount Everest is in which country?", options:["India","China","Nepal","Tibet"], answer:2, explanation:"Everest ← ← ←ñ Nepal ← ← ←ñ।", image:"🏔️", type:"mcq", points:15 },
              { id:"c5g003", q:"Chess originated in India — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"♟️", type:"true_false", points:15 },
              { id:"c5g004", q:"ISRO's first satellite 'Aryabhata' launched in?", options:["1972","1975","1980","1985"], answer:1, explanation:"Aryabhata = 1975।", image:"🛸", type:"mcq", points:15 },
              { id:"c5g005", q:"The Red Planet?", options:["Venus","Jupiter","Mars","Saturn"], answer:2, explanation:"Mars = Red Planet।", image:"🔴", type:"mcq", points:15 },
              { id:"c5g006", q:"Sachin scored 100 international centuries — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🏏", type:"true_false", points:15 },
              { id:"c5g007", q:"Mahatma Gandhi born on October 2, 1869 — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🕊️", type:"true_false", points:15 },
              { id:"c5g008", q:"Ozone layer is in?", options:["Troposphere","Stratosphere","Mesosphere","Thermosphere"], answer:1, explanation:"Ozone = Stratosphere।", image:"🌍", type:"mcq", points:15 },
              { id:"c5g009", q:"Amazon River is in which continent?", options:["Africa","South America","Asia","North America"], answer:1, explanation:"Amazon ← ← ←ñ South America।", image:"🌊", type:"mcq", points:15 },
              { id:"c5g010", q:"ISRO = Indian Space Research Organisation — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ।", image:"🚀", type:"true_false", points:15 },
              { id:"c5g011", q:"Chipko Movement was to save?", options:["Water","Trees","Animals","Soil"], answer:1, explanation:"Chipko = save trees।", image:"🌳", type:"mcq", points:15 },
              { id:"c5g012", q:"Statue of Liberty was gifted to USA by?", options:["UK","Germany","France","Italy"], answer:2, explanation:"France ← ← ←ñ USA ← ← ←ñ।", image:"🗽", type:"mcq", points:15 },
              { id:"c5g013", q:"United Nations founded in?", options:["1942","1945","1948","1950"], answer:1, explanation:"UN = 1945।", image:"🌍", type:"mcq", points:15 },
              { id:"c5g014", q:"Dandi March was against Salt Tax — ③ ← ②ñ?", options:["ହ ③ ← ②ñ","ନ ③ ← ②ñ"], answer:0, explanation:"ହ ③ ← ②ñ, 1930।", image:"🕊️", type:"true_false", points:15 },
              { id:"c5g015", q:"Which planet has rings?", options:["Jupiter","Mars","Saturn","Uranus"], answer:2, explanation:"Saturn ← ← ←ñ ← ← ←ñ ← ← ←ñ।", image:"🪐", type:"mcq", points:15 }
            ]
          }
        ]
      }
    }
  }
};

// ====================================================
// BADGES CONFIGURATION
// ====================================================
const BADGES_CONFIG = [
  { id: "badge_first_game",   title: "ପ ③ ← ②ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ",  desc: "← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ ← ← ←ñ।",      icon: "🏅" },
  { id: "badge_stars_10",     title: "🌟 10 Stars",                           desc: "Earn 10 stars total।",                            icon: "🌟" },
  { id: "badge_stars_50",     title: "⭐ 50 Stars",                           desc: "Earn 50 stars total।",                            icon: "⭐" },
  { id: "badge_games_5",      title: "🏆 5 Games",                           desc: "Complete 5 games।",                               icon: "🏆" },
  { id: "badge_games_10",     title: "📚 10 Games",                          desc: "Complete 10 games।",                              icon: "📚" },
  { id: "badge_perfect_quiz", title: "🎯 Quiz Master",                       desc: "100% correct in one game।",                       icon: "🎯" },
  { id: "badge_math_star",    title: "📐 Math Star",                         desc: "Complete a Math game।",                           icon: "📐" },
  { id: "badge_english_star", title: "🔤 English Star",                      desc: "Complete an English game।",                       icon: "🔤" },
  { id: "badge_gk_champ",     title: "🧠 GK Champion",                      desc: "Complete a GK game।",                             icon: "🧠" },
  { id: "badge_memory_king",  title: "🃏 Memory King",                       desc: "Win a Memory Card game।",                         icon: "🃏" },
  { id: "badge_class5_hero",  title: "🏆 Class 5 Hero",                     desc: "Complete a Class 5 game।",                        icon: "🏆" }
];
