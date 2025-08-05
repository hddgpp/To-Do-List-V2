const listInput = document.querySelector('.js-list-value')
        const dateInput = document.querySelector('.js-date-value')
        const addValues = document.querySelector('.js-date-list-adding')
        const deleteValues = document.querySelector('.js-date-list-deleting')
        const listUl = document.querySelector('.js-list-ul')
        const main = document.querySelector('.main-stuff')
        const tasksNumbers = document.querySelector('.js-tasks-numbers')
        // const dateUl = document.querySelector('.js-date-ul') //

        const todoArr = JSON.parse(localStorage.getItem('storage')) || {
            tasksArr: [],
            dateArr: [],
            tasks : 0
        }
        tasksAdding()


        

        function gettingValues() {
            const tasks = listInput.value.trim()
            const dates = dateInput.value

            if(!tasks) return alert('enter ur task and ur due day')

            todoArr.tasksArr.push(tasks)
            todoArr.dateArr.push(dates)

            todoArr.tasks ++
            tasksNumbers.textContent = `Tasks: ${todoArr.tasks}`

            listUl.innerHTML = ''
            // dateUl.innerHTML = ''//
            listInput.value = ''
            dateInput.value = ''
            tasksAdding()
        }

        function tasksAdding(){
            listUl.innerHTML = ''

            for(let i = 0; i < todoArr.tasksArr.length; i++) {

                const li = document.createElement('li')
                const task = document.createElement('p')
                const due = document.createElement('p')
                const lsitDiv = document.createElement('div')

                lsitDiv.className = 'listDiv-css'
                
                due.className = 'due-css'
                task.className = 'task-css'

                if (todoArr.dateArr[i]) {
                        task.textContent = `task: ${todoArr.tasksArr[i]}`
                        due.textContent = `due: ${todoArr.dateArr[i]}`
                    } else if (!todoArr.dateArr[i]) {
                        task.textContent = `task: ${todoArr.tasksArr[i]}`
                    }

                const deleteBtn = document.createElement('button')
                deleteBtn.className = 'css-DeleteTask btn'
                deleteBtn.textContent = 'Delete'
                deleteBtn.addEventListener(('click'), () => {
                    todoArr.tasks --
                    tasksNumbers.textContent = `Tasks: ${todoArr.tasks}`
                    todoArr.tasksArr.splice(i, 1)
                    todoArr.dateArr.splice(i, 1)
                    li.remove()
                    lsitDiv.remove()
                    tasksAdding()
                })
                tasksNumbers.textContent = `Tasks: ${todoArr.tasks}`
                

                console.log(todoArr.tasksArr)
                console.log(todoArr.dateArr)

                listUl.appendChild(li)
                li.appendChild(task)
                li.appendChild(due)
                li.appendChild(deleteBtn)
                listUl.appendChild(lsitDiv)
            }
            localStorage.setItem('storage', JSON.stringify(todoArr))
        }

        addValues.addEventListener('click', () => {
             gettingValues()
        })

        deleteValues.addEventListener('click', () => {
    if (todoArr.tasksArr.length === 0) {
        alert('nothing to delete')
        return
    }
    
    todoArr.tasksArr = []
    todoArr.dateArr = []
    todoArr.tasks = 0

    tasksNumbers.textContent = `Tasks: ${todoArr.tasks}`

    localStorage.setItem('storage', JSON.stringify(todoArr))

    tasksAdding()
})