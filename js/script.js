// =========================================
// HOMENEST - INTERACTIONS
// =========================================

document.addEventListener("DOMContentLoaded", () => {


    // =====================================
    // TASK CHECKBOXES
    // =====================================

    const taskItems =
        document.querySelectorAll(".task-item");


    taskItems.forEach((task) => {

        const checkbox =
            task.querySelector(
                "input[type='checkbox']"
            );


        checkbox.addEventListener("change", () => {

            task.classList.toggle(
                "completed",
                checkbox.checked
            );

        });

    });



    // =====================================
    // SHOPPING CHECKBOXES
    // =====================================

    const shoppingItems =
        document.querySelectorAll(
            ".shopping-item"
        );


    shoppingItems.forEach((item) => {

        const checkbox =
            item.querySelector(
                "input[type='checkbox']"
            );


        checkbox.addEventListener("change", () => {

            item.classList.toggle(
                "purchased",
                checkbox.checked
            );

        });

    });



    // =====================================
    // TASK MODAL
    // =====================================

    const taskModal =
        document.getElementById(
            "taskModal"
        );


    const closeTaskModal =
        document.getElementById(
            "closeTaskModal"
        );


    const cancelTask =
        document.getElementById(
            "cancelTask"
        );


    const taskForm =
        document.getElementById(
            "taskForm"
        );


    const addTaskButtons =
        document.querySelectorAll(
            ".add-button"
        );


    addTaskButtons.forEach((button) => {

        if (
            button.textContent
                .trim()
                .includes("Add task")
        ) {

            button.addEventListener(
                "click",
                () => {

                    taskModal.classList.add(
                        "show"
                    );

                    document
                        .getElementById(
                            "taskName"
                        )
                        .focus();

                }
            );

        }

    });


    function closeTaskModalWindow() {

        taskModal.classList.remove(
            "show"
        );

    }


    closeTaskModal.addEventListener(
        "click",
        closeTaskModalWindow
    );


    cancelTask.addEventListener(
        "click",
        closeTaskModalWindow
    );


    taskModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === taskModal
            ) {

                closeTaskModalWindow();

            }

        }
    );



    // =====================================
    // ADD NEW TASK
    // =====================================

    taskForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const taskName =
                document
                    .getElementById(
                        "taskName"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "taskCategory"
                    )
                    .value;


            if (!taskName) {
                return;
            }


            const taskList =
                document.querySelector(
                    ".task-list"
                );


            const newTask =
                document.createElement(
                    "label"
                );


            newTask.className =
                "task-item";


            newTask.innerHTML = `
                <input type="checkbox">

                <span class="checkbox"></span>

                <span class="task-details">

                    <strong>
                        ${taskName}
                    </strong>

                    <small>
                        ${category}
                    </small>

                </span>
            `;


            taskList.appendChild(
                newTask
            );


            const checkbox =
                newTask.querySelector(
                    "input[type='checkbox']"
                );


            checkbox.addEventListener(
                "change",
                () => {

                    newTask.classList.toggle(
                        "completed",
                        checkbox.checked
                    );

                }
            );


            taskForm.reset();

            closeTaskModalWindow();

        }
    );



    // =====================================
    // EXPENSE MODAL
    // =====================================

    const expenseModal =
        document.getElementById(
            "expenseModal"
        );


    const addExpenseButton =
        document.getElementById(
            "addExpenseButton"
        );


    const closeExpenseModal =
        document.getElementById(
            "closeExpenseModal"
        );


    const cancelExpense =
        document.getElementById(
            "cancelExpense"
        );


    const expenseForm =
        document.getElementById(
            "expenseForm"
        );


    const expenseList =
        document.getElementById(
            "expenseList"
        );


    const dailyExpenseTotal =
        document.getElementById(
            "dailyExpenseTotal"
        );


    let dailyTotal = 2720;



    // =====================================
    // SET TODAY'S DATE
    // =====================================

    const today = new Date();


    const dateInput =
        document.getElementById(
            "expenseInputDate"
        );


    dateInput.value =
        formatDateForInput(today);



    // =====================================
    // OPEN EXPENSE MODAL
    // =====================================

    addExpenseButton.addEventListener(
        "click",
        () => {

            expenseModal.classList.add(
                "show"
            );

            document
                .getElementById(
                    "expenseName"
                )
                .focus();

        }
    );



    // =====================================
    // CLOSE EXPENSE MODAL
    // =====================================

    function closeExpenseModalWindow() {

        expenseModal.classList.remove(
            "show"
        );

    }


    closeExpenseModal.addEventListener(
        "click",
        closeExpenseModalWindow
    );


    cancelExpense.addEventListener(
        "click",
        closeExpenseModalWindow
    );


    expenseModal.addEventListener(
        "click",
        (event) => {

            if (
                event.target === expenseModal
            ) {

                closeExpenseModalWindow();

            }

        }
    );



    // =====================================
    // ADD EXPENSE
    // =====================================

    expenseForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .getElementById(
                        "expenseName"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "expenseCategory"
                    )
                    .value;


            const amount =
                parseFloat(
                    document
                        .getElementById(
                            "expenseAmount"
                        )
                        .value
                );


            const date =
                document
                    .getElementById(
                        "expenseInputDate"
                    )
                    .value;


            if (
                !name ||
                !date ||
                !Number.isFinite(amount) ||
                amount <= 0
            ) {

                return;

            }


            // Create expense item

            const expenseItem =
                document.createElement(
                    "div"
                );


            expenseItem.className =
                "expense-item";


            expenseItem.innerHTML = `
                <div>

                    <strong>
                        ${name}
                    </strong>

                    <small>
                        ${category}
                    </small>

                </div>

                <span>
                    Rs. ${formatNumber(amount)}
                </span>
            `;


            expenseList.prepend(
                expenseItem
            );


            // Update total

            dailyTotal += amount;


            dailyExpenseTotal.textContent =
                `Rs. ${formatNumber(dailyTotal)}`;


            // Reset form

            expenseForm.reset();


            dateInput.value =
                formatDateForInput(
                    today
                );


            closeExpenseModalWindow();

        }
    );



    // =====================================
    // DATE NAVIGATION
    // =====================================

    const expenseDate =
        document.getElementById(
            "expenseDate"
        );


    const expenseDay =
        document.getElementById(
            "expenseDay"
        );


    const previousDay =
        document.getElementById(
            "previousDay"
        );


    const nextDay =
        document.getElementById(
            "nextDay"
        );


    let selectedDate =
        new Date();



    function updateExpenseDate() {

        expenseDate.textContent =
            formatReadableDate(
                selectedDate
            );


        expenseDay.textContent =
            getRelativeDay(
                selectedDate
            );

    }


    previousDay.addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() - 1
            );

            updateExpenseDate();

        }
    );


    nextDay.addEventListener(
        "click",
        () => {

            selectedDate.setDate(
                selectedDate.getDate() + 1
            );

            updateExpenseDate();

        }
    );


    updateExpenseDate();



    // =====================================
    // ESCAPE KEY
    // =====================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape"
            ) {

                taskModal.classList.remove(
                    "show"
                );

                expenseModal.classList.remove(
                    "show"
                );

            }

        }
    );

});



// =========================================
// HELPER FUNCTIONS
// =========================================

function formatNumber(number) {

    return new Intl.NumberFormat(
        "en-LK",
        {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }
    ).format(number);

}


function formatDateForInput(date) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(2, "0");


    const day =
        String(
            date.getDate()
        ).padStart(2, "0");


    return `${year}-${month}-${day}`;

}


function formatReadableDate(date) {

    return date.toLocaleDateString(
        "en-US",
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );

}


function getRelativeDay(date) {

    const today =
        new Date();


    const selected =
        new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate()
        );


    const current =
        new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );


    const difference =
        Math.round(
            (
                selected - current
            ) /
            (1000 * 60 * 60 * 24)
        );


    if (difference === 0) {
        return "Today";
    }


    if (difference === -1) {
        return "Yesterday";
    }


    if (difference === 1) {
        return "Tomorrow";
    }


    return date.toLocaleDateString(
        "en-US",
        {
            weekday: "long"
        }
    );

}