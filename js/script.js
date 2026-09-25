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

// ========================================
// SHOPPING LIST
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const shoppingModal =
        document.getElementById("shoppingModal");

    const addShoppingButton =
        document.getElementById("addShoppingButton");

    const closeShoppingModal =
        document.getElementById("closeShoppingModal");

    const cancelShopping =
        document.getElementById("cancelShopping");

    const shoppingForm =
        document.getElementById("shoppingForm");

    const shoppingList =
        document.getElementById("shoppingList");

    const shoppingCount =
        document.getElementById("shoppingCount");


    // -----------------------------------------
    // Find the "Things to buy" number
    // -----------------------------------------

    const overviewCards =
        document.querySelectorAll(".overview-card");

    let shoppingOverviewNumber = null;

    overviewCards.forEach((card) => {

        const text = card.textContent.toLowerCase();

        if (text.includes("things to buy")) {
            shoppingOverviewNumber =
                card.querySelector("strong");
        }

    });


    // -----------------------------------------
    // Open shopping modal
    // -----------------------------------------

    if (addShoppingButton && shoppingModal) {

        addShoppingButton.addEventListener("click", () => {

            shoppingModal.classList.add("show");

            const nameInput =
                document.getElementById("shoppingName");

            if (nameInput) {
                nameInput.focus();
            }

        });

    }


    // -----------------------------------------
    // Close shopping modal
    // -----------------------------------------

    function closeShopping() {

        if (shoppingModal) {
            shoppingModal.classList.remove("show");
        }

    }


    if (closeShoppingModal) {
        closeShoppingModal.addEventListener(
            "click",
            closeShopping
        );
    }


    if (cancelShopping) {
        cancelShopping.addEventListener(
            "click",
            closeShopping
        );
    }


    // -----------------------------------------
    // Click outside modal to close
    // -----------------------------------------

    if (shoppingModal) {

        shoppingModal.addEventListener(
            "click",
            (event) => {

                if (event.target === shoppingModal) {
                    closeShopping();
                }

            }
        );

    }


    // -----------------------------------------
    // Add new shopping item
    // -----------------------------------------

    if (shoppingForm) {

        shoppingForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("shoppingName")
                        .value
                        .trim();


                const category =
                    document
                        .getElementById("shoppingCategory")
                        .value;


                const type =
                    document
                        .getElementById("shoppingType")
                        .value;


                const quantity =
                    parseInt(
                        document
                            .getElementById("shoppingQuantity")
                            .value
                    );


                if (!name) {
                    return;
                }


                // Create new item
                const item =
                    document.createElement("label");

                item.className =
                    "shopping-item";


                item.innerHTML = `
                    <input type="checkbox">

                    <span class="checkbox"></span>

                    <span class="shopping-details">

                        <strong>
                            ${name}${quantity > 1 ? ` × ${quantity}` : ""}
                        </strong>

                        <small>
                            ${type} · ${category}
                        </small>

                    </span>
                `;


                // Add item to top of list
                shoppingList.prepend(item);


                // Add checkbox behaviour
                attachShoppingCheckbox(item);


                // Update numbers
                updateShoppingCount();


                // Reset form
                shoppingForm.reset();

                document.getElementById(
                    "shoppingQuantity"
                ).value = "1";


                // Close modal
                closeShopping();

            }
        );

    }


    // -----------------------------------------
    // Shopping checkbox behaviour
    // -----------------------------------------

    function attachShoppingCheckbox(item) {

        const checkbox =
            item.querySelector(
                "input[type='checkbox']"
            );


        if (!checkbox) {
            return;
        }


        checkbox.addEventListener(
            "change",
            () => {

                item.classList.toggle(
                    "completed",
                    checkbox.checked
                );


                updateShoppingCount();

            }
        );

    }


    // -----------------------------------------
    // Update shopping numbers
    // -----------------------------------------

    function updateShoppingCount() {

        if (!shoppingList) {
            return;
        }


        const items =
            shoppingList.querySelectorAll(
                ".shopping-item"
            );


        let remaining = 0;


        items.forEach((item) => {

            const checkbox =
                item.querySelector(
                    "input[type='checkbox']"
                );


            if (checkbox && !checkbox.checked) {
                remaining++;
            }

        });


        // Number inside Shopping card
        if (shoppingCount) {

            shoppingCount.textContent =
                `${remaining} ${
                    remaining === 1
                        ? "item"
                        : "items"
                } to buy`;

        }


        // Number in top overview card
        if (shoppingOverviewNumber) {

            shoppingOverviewNumber.textContent =
                remaining;

        }

    }


    // -----------------------------------------
    // Existing shopping items
    // -----------------------------------------

    document
        .querySelectorAll(".shopping-item")
        .forEach((item) => {

            attachShoppingCheckbox(item);

        });


    // Set initial count
    updateShoppingCount();

});

// ========================================
// REMINDERS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const reminderModal =
        document.getElementById("reminderModal");

    const addReminderButton =
        document.getElementById("addReminderButton");

    const closeReminderModal =
        document.getElementById("closeReminderModal");

    const cancelReminder =
        document.getElementById("cancelReminder");

    const reminderForm =
        document.getElementById("reminderForm");

    const reminderList =
        document.getElementById("reminderList");


    // -----------------------------------------
    // Find top Reminders number
    // -----------------------------------------

    const overviewCards =
        document.querySelectorAll(".overview-card");

    let reminderOverviewNumber = null;

    overviewCards.forEach((card) => {

        const text =
            card.textContent.toLowerCase();

        if (text.includes("reminders")) {

            reminderOverviewNumber =
                card.querySelector("strong");

        }

    });


    // -----------------------------------------
    // Open modal
    // -----------------------------------------

    if (addReminderButton && reminderModal) {

        addReminderButton.addEventListener(
            "click",
            () => {

                reminderModal.classList.add("show");

                document
                    .getElementById("reminderName")
                    .focus();

            }
        );

    }


    // -----------------------------------------
    // Close modal
    // -----------------------------------------

    function closeReminder() {

        reminderModal.classList.remove("show");

    }


    if (closeReminderModal) {

        closeReminderModal.addEventListener(
            "click",
            closeReminder
        );

    }


    if (cancelReminder) {

        cancelReminder.addEventListener(
            "click",
            closeReminder
        );

    }


    // -----------------------------------------
    // Click outside modal
    // -----------------------------------------

    if (reminderModal) {

        reminderModal.addEventListener(
            "click",
            (event) => {

                if (event.target === reminderModal) {
                    closeReminder();
                }

            }
        );

    }


    // -----------------------------------------
    // Add reminder
    // -----------------------------------------

    if (reminderForm) {

        reminderForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("reminderName")
                        .value
                        .trim();


                const type =
                    document
                        .getElementById("reminderType")
                        .value;


                const dateValue =
                    document
                        .getElementById("reminderDate")
                        .value;


                if (!name || !dateValue) {
                    return;
                }


                const date =
                    new Date(
                        dateValue + "T00:00:00"
                    );


                const day =
                    date.getDate();


                const month =
                    date.toLocaleDateString(
                        "en-US",
                        {
                            month: "short"
                        }
                    ).toUpperCase();


                // Create reminder
                const reminder =
                    document.createElement("div");


                reminder.className =
                    "reminder-item";


                reminder.innerHTML = `

                    <div class="reminder-date">

                        <strong>
                            ${day}
                        </strong>

                        <small>
                            ${month}
                        </small>

                    </div>


                    <div class="reminder-details">

                        <strong>
                            ${name}
                        </strong>

                        <small>
                            ${type}
                        </small>

                    </div>

                `;


                // Add newest reminder to top
                reminderList.prepend(reminder);


                // Update number
                updateReminderCount();


                // Reset form
                reminderForm.reset();


                // Close modal
                closeReminder();

            }
        );

    }


    // -----------------------------------------
    // Update top number
    // -----------------------------------------

    function updateReminderCount() {

        const reminders =
            reminderList.querySelectorAll(
                ".reminder-item"
            );


        if (reminderOverviewNumber) {

            reminderOverviewNumber.textContent =
                reminders.length;

        }

    }


    // Initial count
    updateReminderCount();

});

// ========================================
// CALENDAR
// ========================================

document.addEventListener("DOMContentLoaded", () => {

    const calendarGrid =
        document.getElementById("calendarGrid");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const previousMonth =
        document.getElementById("previousMonth");

    const nextMonth =
        document.getElementById("nextMonth");

    const selectedCalendarDate =
        document.getElementById("selectedCalendarDate");

    const calendarDayMessage =
        document.getElementById("calendarDayMessage");


    let calendarDate = new Date();

    let selectedDate = null;


    // -----------------------------------------
    // Render calendar
    // -----------------------------------------

    function renderCalendar() {

        calendarGrid.innerHTML = "";


        const year =
            calendarDate.getFullYear();

        const month =
            calendarDate.getMonth();


        calendarMonth.textContent =
            calendarDate.toLocaleDateString(
                "en-US",
                {
                    month: "long",
                    year: "numeric"
                }
            );


        // First day of month
        const firstDay =
            new Date(
                year,
                month,
                1
            );


        // Number of days
        const daysInMonth =
            new Date(
                year,
                month + 1,
                0
            ).getDate();


        // Convert Sunday = 0 to Monday = 0
        let startingDay =
            firstDay.getDay();

        startingDay =
            startingDay === 0
                ? 6
                : startingDay - 1;


        // Empty cells before first day
        for (
            let i = 0;
            i < startingDay;
            i++
        ) {

            const emptyDay =
                document.createElement("div");

            emptyDay.className =
                "calendar-day empty";

            calendarGrid.appendChild(
                emptyDay
            );

        }


        // Create days
        for (
            let day = 1;
            day <= daysInMonth;
            day++
        ) {

            const button =
                document.createElement("button");

            button.type = "button";

            button.className =
                "calendar-day";


            const number =
                document.createElement("span");

            number.className =
                "calendar-day-number";

            number.textContent = day;


            button.appendChild(number);


            // Check today's date
            const today =
                new Date();


            if (
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear()
            ) {

                button.classList.add(
                    "today"
                );

            }


            // Select date
            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".calendar-day.selected"
                        )
                        .forEach((item) => {
                            item.classList.remove(
                                "selected"
                            );
                        });


                    button.classList.add(
                        "selected"
                    );


                    selectedDate =
                        new Date(
                            year,
                            month,
                            day
                        );


                    showSelectedDate();

                }
            );


            calendarGrid.appendChild(
                button
            );

        }

    }


    // -----------------------------------------
    // Selected date information
    // -----------------------------------------

    function showSelectedDate() {

        if (!selectedDate) {
            return;
        }


        selectedCalendarDate.textContent =
            selectedDate.toLocaleDateString(
                "en-US",
                {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric"
                }
            );


        calendarDayMessage.textContent =
            "Your home activities for this day will appear here.";

    }


    // -----------------------------------------
    // Previous month
    // -----------------------------------------

    previousMonth.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() - 1
            );

            renderCalendar();

        }
    );


    // -----------------------------------------
    // Next month
    // -----------------------------------------

    nextMonth.addEventListener(
        "click",
        () => {

            calendarDate.setMonth(
                calendarDate.getMonth() + 1
            );

            renderCalendar();

        }
    );


    // Initial calendar
    renderCalendar();

});