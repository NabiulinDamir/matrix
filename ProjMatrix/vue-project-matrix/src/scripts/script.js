export function triggerComponentMethod(componentInstance) {
    if (
        componentInstance &&
        typeof componentInstance.someMethod === "function" &&
        typeof componentInstance.AddSteps === "function" &&
        typeof componentInstance.addElement === "function"
    ) {
        
        componentInstance.someMethod("ожидайте"); // Вызываем метод компонента
        

        let StartMatrix = componentInstance.sm
        let FinishMatrix = componentInstance.fm

        
        // let StartMatrix = [
        //     [2, 4, 3],
        //     [1, 8, 5],
        //     [7, 0, 6],
        // ];
        // let FinishMatrix = [
        //     [1, 2, 3],
        //     [4, 5, 6],
        //     [7, 8, 0],
        // ];

        class MatrixTree {
            constructor(matrix, FinishMatrix) {
                this.Head = new Node(matrix, FinishMatrix, null, -1);
                this.FinishMatrix = FinishMatrix;
                this.minQ = this.Head.returnQ();
                this.level = 0;

                this.StopRecurse = false; //для завершения рекурсии
                this.StopGame = false; //для завершения игры
            }

            FindMinQ(node) {
                if (node.children.length === 0 && node.returnQ() < this.minQ) {
                    this.minQ = node.returnQ();
                    return;
                } else {
                    node.children.forEach((child) => {
                        this.FindMinQ(child);
                    });
                }
            }

            PrintSolution(node){
                while(node.matrix != this.Head.matrix){
                    componentInstance.addElement(node.matrix, node.level, node.g, node.returnQ());
                    node = node.father
                }
                componentInstance.addElement(this.Head.matrix, this.Head.level, this.Head.g, this.Head.returnQ());
                
            }

            async Game() {
                setTimeout(() => {
                    if (!this.StopGame) {
                        componentInstance.someMethod("превышено время ожидания"); //Добавить вызов внешней функции
                        this.StopGame = true;
                    }
                }, 30000);

                // Основной цикл игры
                while (!this.StopGame) {
                    this.StopRecurse = false;
                    this.minQ = 999;
                    
                    this.FindMinQ(this.Head);
                    this.FindQ_Steps(this.Head);


                    await new Promise((resolve) => setTimeout(resolve, 0));
                }

            }

            FindQ_Steps(node) {
                
                if (!this.StopRecurse) {
                    if (
                        node.children.length === 0 &&
                        node.returnQ() === this.minQ
                    ) {
                        if (node.g == 0) {
                            this.StopGame = true;
                            // this.PrintInCanvas(this.Head)
                            componentInstance.someMethod("ура, победа"); //Добавить вызов внешней функции
                            this.PrintSolution(node);
                            
                        } else {
                            componentInstance.AddSteps()
                            node.step();
                            this.StopRecurse = true;
                        }
                    } else {
                        node.children.forEach((child) => {
                            this.FindQ_Steps(child);
                        });
                    }
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
            }

            returnQ() {
                return this.level + this.g;
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
                let child = new Node(
                    matrix,
                    this.FinishMatrix,
                    this,
                    this.level + 1
                );
                this.children.push(child);
            }

            print() {
                console.log(this.returnQ(), "-", this.level);
                console.table(this.matrix);
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

            step() {
                // не ссылки

                let row = this.matrix.length;
                let column = this.matrix[0].length;
                for (let i = 0; i < column; i++) {
                    for (let j = 0; j < row; j++) {
                        if (this.matrix[i][j] === 0) {
                            if (i > 0) {
                                let tmpMatrix = this.copyMatrix(this.matrix);
                                [tmpMatrix[i][j], tmpMatrix[i - 1][j]] = [
                                    tmpMatrix[i - 1][j],
                                    tmpMatrix[i][j],
                                ]; // вверх
                                if (this.father == null || (this.father !== null && !this.matricesAreEqual(tmpMatrix,this.father.matrix))){
                                    this.addChild(tmpMatrix);
                                }
                            }
                            if (i < column - 1) {
                                let tmpMatrix = this.copyMatrix(this.matrix);
                                [tmpMatrix[i][j], tmpMatrix[i + 1][j]] = [
                                    tmpMatrix[i + 1][j],
                                    tmpMatrix[i][j],
                                ]; //вниз
                                if (
                                    this.father == null ||
                                    (this.father !== null &&
                                        !this.matricesAreEqual(
                                            tmpMatrix,
                                            this.father.matrix
                                        ))
                                ) {
                                    this.addChild(tmpMatrix);
                                }
                            }
                            if (j > 0) {
                                let tmpMatrix = this.copyMatrix(this.matrix);
                                [tmpMatrix[i][j], tmpMatrix[i][j - 1]] = [
                                    tmpMatrix[i][j - 1],
                                    tmpMatrix[i][j],
                                ]; //влево
                                if (
                                    this.father == null ||
                                    (this.father !== null &&
                                        !this.matricesAreEqual(
                                            tmpMatrix,
                                            this.father.matrix
                                        ))
                                ) {
                                    this.addChild(tmpMatrix);
                                }
                            }
                            if (j < row - 1) {
                                let tmpMatrix = this.copyMatrix(this.matrix);
                                [tmpMatrix[i][j], tmpMatrix[i][j + 1]] = [
                                    tmpMatrix[i][j + 1],
                                    tmpMatrix[i][j],
                                ]; //вправо
                                if (
                                    this.father == null ||
                                    (this.father !== null &&
                                        !this.matricesAreEqual(
                                            tmpMatrix,
                                            this.father.matrix
                                        ))
                                ) {
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

    }
}
