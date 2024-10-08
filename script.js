let StartMatrix = [
    [2, 4, 3],
    [1, 8, 5],
    [7, 0, 6],
];
let StartMatrix2 = [
    [1, 4, 3],
    [2, 5, 8],
    [7, 0, 6],
];
let StartMatrix3 = [
    [1, 4, 3],
    [2, 5, 6],
    [7, 0, 8],
];
let FinishMatrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 0],
];

class MatrixTree {
    constructor(matrix, FinishMatrix) {
        this.Head = new Node(matrix, FinishMatrix, null, -1);
        this.FinishMatrix = FinishMatrix;
        this.minQ = this.Head.returnQ();
        this.level = 0

        this.StopRecurse = false//для завершения рекурсии
        this.StopGame = false//для завершения игры
    }

    



    FindMinQ(node) {
        if (node.children.length === 0 && node.returnQ() < this.minQ) {
            this.minQ = node.returnQ()
            return
        } else {
            node.children.forEach(child => {
                this.FindMinQ(child);
            });
        }
    }

    print(node){
        node.print()
        if (node.children.length === 0) {
            return
        } else {
            node.children.forEach(child => {
                this.print(child)
            });
        }
        return

    }

    Game(){
        let a = 15
        while(!this.StopGame){
            this.StopRecurse = false
            this.minQ = 999
            this.FindMinQ(this.Head)    
            this.FindQ_Steps(this.Head);     
            // console.log("============")   
        }
        
    }

    FindQ_Steps(node){
        if(!this.StopRecurse){
           if(node.children.length === 0 && node.returnQ() === this.minQ){
                if(node.g === 0){
                    this.StopGame = true
                    console.log("ура победа")
                }
                else{
                    node.step()
                    this.StopRecurse = true
                    console.log("создаем детей")
                }
           }
           else{
                node.children.forEach(child => {
                    this.FindQ_Steps(child)
                });
           }
        //    node.print();
        // console.log(node.returnQ(), "---" , this.minQ)
        }
        
        
    }

}

class Node {
    constructor(matrix, FinishMatrix, father = null, newLevel = 0) {
        this.FinishMatrix = FinishMatrix;
        this.matrix = matrix;
        this.father = father;
        this.children = [];
        this.level = newLevel;
        this.g = this.returnG(); // количество вершин не на своих местах
        // this.q = this.level + this.g; // g + level
    }

    returnQ(){
        return this.level + this.g
    }

    returnG() {
        let count = 0;
        for (let i = 0; i < this.matrix.length; i++) {
            for (let j = 0; j < this.matrix[i].length; j++) {
                if (this.matrix[i][j] != this.FinishMatrix[i][j]) {
                    count++;
                }
            }
        }
        return count;
    }

    addChild(matrix) {
        let child = new Node(matrix, this.FinishMatrix, this, this.level+1)
        this.children.push(child);
    }

    print(){
        console.log(this.returnQ() , "-" , this.level)
        console.table(this.matrix)
    }

    copyMatrix(matrix) {
        let newMatrix = []; 
        for (let i = 0; i < matrix.length; i++) {
            newMatrix.push([]);
            for (let j = 0; j < matrix[i].length; j++) {
                newMatrix[i].push(matrix[i][j]); 
            }
        }
        return newMatrix;
    }
    

    // createNewNode(matrix){
    //     let newMatrix = 
    // }

    step(){
        // не ссылки
        
        let row = this.matrix.length
        let column = this.matrix[0].length
        for (let i = 0; i < column; i++) {
            for (let j = 0; j < row; j++) {
                if (this.matrix[i][j] === 0) {
                    if (i > 0) {
                        let tmpMatrix = this.copyMatrix(this.matrix);
                        [tmpMatrix[i][j], tmpMatrix[i - 1][j]] = [tmpMatrix[i - 1][j], tmpMatrix[i][j]]; // вверх
                        if (this.father == null || (this.father !== null && !this.matricesAreEqual(tmpMatrix, this.father.matrix))) {
                            this.addChild(tmpMatrix);
                        }
                    }
                    if(i < column-1){
                        let tmpMatrix = this.copyMatrix(this.matrix);
                        [tmpMatrix[i][j], tmpMatrix[i + 1][j]] = [tmpMatrix[i + 1][j], tmpMatrix[i][j]]//вниз
                        if (this.father == null || (this.father !== null && !this.matricesAreEqual(tmpMatrix, this.father.matrix))) {
                            this.addChild(tmpMatrix);
                            // console.log(this.father.matrix ===  tmpMatrix)
                            // this.father.print()
                            // this.children[1].print()
                            
                        }
                    }

                    if(j > 0){
                        let tmpMatrix = this.copyMatrix(this.matrix);     
                        [tmpMatrix[i][j], tmpMatrix[i][j - 1]] = [tmpMatrix[i][j - 1], tmpMatrix[i][j]]//влево
                        if (this.father == null || (this.father !== null && !this.matricesAreEqual(tmpMatrix, this.father.matrix))) {
                            this.addChild(tmpMatrix);
                        }
                    }

                    if(j < row-1){
                        let tmpMatrix = this.copyMatrix(this.matrix); 
                        [tmpMatrix[i][j], tmpMatrix[i][j + 1]] = [tmpMatrix[i][j + 1], tmpMatrix[i][j]]//вправо
                        if (this.father == null || (this.father !== null && !this.matricesAreEqual(tmpMatrix, this.father.matrix))) {
                            this.addChild(tmpMatrix);
                        }
                    }

                    
                    
                }
            }
        }
    }

    matricesAreEqual(matrix1, matrix2) {
        if (matrix1.length !== matrix2.length) return false;
        for (let i = 0; i < matrix1.length; i++) {
            if (matrix1[i].length !== matrix2[i].length) return false;
            for (let j = 0; j < matrix1[i].length; j++) {
                if (matrix1[i][j] !== matrix2[i][j]) return false;
            }
        }
        return true;
    }

}

const Tree = new MatrixTree(StartMatrix, FinishMatrix);
Tree.Game(Tree.Head);
// console.log(Tree.Head.returnQ()); // выведем q первого узла

// Tree.Head.addChild(new Node(StartMatrix2, FinishMatrix))
// Tree.Head.addChild(new Node(StartMatrix3, FinishMatrix))

// Tree.FindMinQ(Tree.Head)
// Tree.Head.step()
Tree.print(Tree.Head)

// Tree.FindMinQ(Tree.Head); // Теперь найдем и выведем минимальное q

// console.log(Tree.minQ)
