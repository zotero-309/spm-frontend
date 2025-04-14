<template>
  <div class="vue-root">
    <div id="primaryContainer">
      <div id="header">
        <smart-button id="toggleButton"></smart-button>
        <div id="title">Scheduler</div>
      </div>
      <div class="content">
        <section id="sideA">
          <!-- <div class="button-container">
            <div id="logo"></div>
          </div> -->
          <div class="controls-container">
            <smart-calendar id="calendar"></smart-calendar>
            <smart-tree id="tree" selection-mode="checkBox" toggle-element-position="far">
              <smart-tree-items-group expanded>My calendars
                <smart-tree-item value="Approved" selected>Approved</smart-tree-item>
                <smart-tree-item value="Pending_Approval" selected>Pending_Approval</smart-tree-item>
                <smart-tree-item value="Pending_Withdrawal" selected>Pending_Withdrawal</smart-tree-item>
              </smart-tree-items-group>
            </smart-tree>
          </div>
        </section>
        <section id="sideB">
          <smart-scheduler id="scheduler" disableEventMenu disableContextMenu hideNonworkingWeekdays>
            <div id="loading-icon" class="loading" style="display: none;">
              <div class="spinner"></div>
            </div>
            <!-- Multiline Prompt Window -->
            <smart-multiline-prompt-window id="multilinePromptWindow" label="Withdrawal"
              prompt-label="Let your manager know why you are withdrawing!" class="material"
              placeholder="enter your reasons"></smart-multiline-prompt-window>
          </smart-scheduler>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import axios from "axios";
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.calendar.js";
import "smart-webcomponents/source/modules/smart.input.js";
import "smart-webcomponents/source/modules/smart.tree.js";
import "smart-webcomponents/source/modules/smart.scheduler.js";
import "smart-webcomponents/source/modules/smart.validator.js";
import "smart-webcomponents/source/modules/smart.window.js";
import * as pkg from 'smart-webcomponents/common/rrule.min.js';
window.rrule = { RRule: pkg.default };

export function filterSchedulerData(data, selectedTypes) {
  return data.filter(d => selectedTypes.indexOf(d.class) > -1);
}

// Refactor this part outside of setup()
export function exist_check(eventt, data) {
  console.log("existapp func reached");
  let check_event = eventt.detail.item;
  var label = check_event.label;
  var formatted_event = {
    date: check_event.dateEnd.toLocaleDateString('en-CA'),
    label: label
  }

  for (let value of data.value) {
    if (value.dateEnd.toLocaleDateString('en-CA') == formatted_event.date) {
      if (formatted_event.label == "FULL" || value.label == formatted_event.label) {
        formatted_event["staff_apply_reason"] = value.description;
        formatted_event["label"] = value.label;
        return [400, formatted_event];
      }
    }
  }

  return [200]
}


export default {
  name: "Scheduler",
  // ================================================================================================================
  // SECTION 1: Initialization
  // ================================================================================================================
  setup() {
    const data = ref([]); // Reactive reference for the data array
    var selectedSchedulerEvent = ref();// to store selected scheduler event
    let schedulerEventObj = ref();
    // Access global properties inside setup() using getCurrentInstance()
    const { proxy } = getCurrentInstance();
    const baseURL = proxy.$baseURL;  // Access $baseURL from global properties
    const staff_id = localStorage.getItem("staff_id");
    const role = localStorage.getItem("role");
    console.log("you're logged in as:", staff_id, role);
    onMounted(() => {
      const today = new Date(),
        currentDate = today.getDate(),
        currentYear = today.getFullYear(),
        currentMonth = today.getMonth(),
        minStartDate = (() => {   // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          startDate.setDate(today.getDate()-1);
          return startDate;
        })(),
        SmallCal_minStartDate = (() => {   // calculation of date from 2 months before today
          const startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 2);
          startDate.setDate(today.getDate());
          return startDate;
        })(),
        maxEndDate = (() => {     // calculation of date 3 months after today
          const endDate = new Date(today);
          endDate.setMonth(today.getMonth() + 3);
          return endDate;
        })(),
        SmallCal_maxEndDate = (() => {   // calculation of date from 2 months before today
          const endDate = new Date(today);
          endDate.setMonth(today.getMonth() + 3);
          endDate.setDate(today.getDate() - 1);
          return endDate;
        })(),
        restrictedDatesArray = (() => {  //calculation of restricted dates 3 months before and after for scheduler display
          const dates = [];
          const dates1 = [];
          const dates2 = [];
          const calendarMin = new Date(1900, 0, 1);
          const calendarMax = new Date(2099, 11, 31);

          // Iterate through the dates from minStartDate to maxEndDate
          for (let d = calendarMin; d < minStartDate; d.setDate(d.getDate() + 1)) {
            dates1.push(new Date(d)); // Push a new date to the array
          }
          for (let d = new Date(maxEndDate); d <= calendarMax; d.setDate(d.getDate() + 1)) {  // cannot directly use maxEndDate value as the for loop mutates d
            dates2.push(new Date(d)); // Push a new date to the array
          }
          const finalBlockedDates = dates.concat(dates1, dates2);
          return finalBlockedDates;
        })()

      // Axios call to fetch aand populate schedule data from the backend
      document.getElementById('loading-icon').style.display = 'block';
      axios.get(`${baseURL}/schedule/own/${staff_id}`)
        .then(response => {
          // Update the data variable with the fetched schedule data
          data.value = response.data;

          // Loop through the data and convert date strings to JavaScript Date objects
          data.value.forEach(item => {
            item.dateStart = new Date(item.dateStart);
            item.dateEnd = new Date(item.dateEnd);
          });
          document.getElementById('loading-icon').style.display = 'none';
          console.log("Schedule db data fetched and updated:", data.value);


          // ====================================================
          // SECTION 1.1 : Scheduler and Calendar Configuration
          // ====================================================

          // [Settings] - Scheduler configuuration code ------------------------------------------------------------
          window.Smart(
            "#scheduler",
            class {
              get properties() {
                return {
                  //Properties
                  view: "week",
                  views: [
                    {
                      type: "day",
                      label: "Day View",
                    },
                    {
                      type: "week",
                      label: "Week View",
                    },
                    {
                      type: "month",
                      label: "Month View",
                    },
                  ],
                  nonworkingDays: [6, 7],
                  dateCurrent: new Date(),
                  dataSource: data.value,
                  firstDayOfWeek: 1,
                  // disableDateMenu: true,
                  currentTimeIndicator: true,
                  // hideOtherMonthDays: true,
                  restrictedDates: restrictedDatesArray,
                  disableDrop: true,
                  disableResize: true,
                  disableDrag: true,
                  min: minStartDate,
                  max: SmallCal_maxEndDate,
                  hourStart: 8,
                  hourEnd: 18,
                  hideAllDay: true,
                  viewSelectorType: "tabs",
                };
              }
            }
          );
        })
        .catch(error => {
          console.error("Error fetching schedule data:", error);
        });

      // [Settings] - calendar on side A configuration code --------------------------------------------------------
      window.Smart(
        "#calendar",
        class {
          get properties() {
            return {
              //Properties
              // scrollButtonsPosition: "far",
              min: SmallCal_minStartDate,
              max: SmallCal_maxEndDate,
            };
          }
        }
      );


      // ===========================================================================================================
      //                                  SECTION 2: Event Listeners
      // ===========================================================================================================



      const primaryContainer = document.getElementById("primaryContainer"),
        calendar = document.getElementById("calendar"),
        scheduler = document.querySelector("smart-scheduler"),
        multilinePromptWindow = document.querySelector("smart-multiline-prompt-window");

      // =====================================================================================
      // Apply [EL]: Restrict and customise main section of form fields everytime window opens
      // =====================================================================================

      scheduler.addEventListener("editDialogOpen", function (event) {
        const editors = event.detail.editors;
        let schedulerEventObj = event;

        if (!editors) {
          return;
        }

        const schedulerEvent = event.detail.item, // listing all the fields in the window that is editable
          allDayEditor = editors.allDay,
          backgroundColorEditor = editors.backgroundColor,
          conferenceEditor = editors.conference,
          dateEndEditor = editors.dateEnd,
          dateStartEditor = editors.dateStart,
          descriptionEditor = editors.description,
          exceptionsEditor = editors.exceptions,
          hiddenEditor = editors.hidden,
          labelEditor = editors.label,
          notificationsEditor = editors.notifications,
          repeatEditor = editors.repeat,
          repeatEndEditor = editors.repeatEnd,
          repeatEndAfterEditor = editors.repeatEndAfter,
          repeatEndOnEditor = editors.repeatEndOn,
          repeatFreqEditor = editors.repeatFreq,
          repeatIntervalEditor = editors.repeatInterval,
          repeatOnEditor = editors.repeatOn,
          resourceDataEditor = editors.resourceData,
          resourcesEditor = editors.resources,
          statusEditor = editors.status,
          mainSectionEditor = editors.description.parentElement,
          repeatSectionEditor = editors.repeat.parentElement,
          selectedDate = new Date(dateStartEditor.querySelector(".smart-element").getAttribute("value")),
          okButton = document.querySelector('.smart-scheduler-window-button.ok.primary.smart-element.smart-button'),
          withdrawButton = document.querySelector('smart-button[aria-label="delete"]');

        selectedSchedulerEvent = event.detail.item; // assign selected scheduler event to global variable

        // ==========================================================================================================
        //                              Apply Window Event Listeners and Setttings
        // ==========================================================================================================
        // ====================================================
        // Apply: Default form modifications
        // ====================================================
        labelEditor.querySelector("smart-input").dataSource = [
          {
            label: "AM"
          },
          {
            label: "PM"
          },
          {
            label: "FULL"
          },
        ]
        labelEditor.querySelector("smart-input").readonly = true; // make it into a list
        labelEditor.querySelector("smart-input").setAttribute("drop-down-button-position", "right"); // add the arrow down to indicate its a drop downlist
        // Check the repeat button by default
        repeatEditor.querySelector(".smart-element").setAttribute("aria-checked", "true");
        repeatEditor.querySelector(".smart-element").checked = true;
        dateStartEditor.querySelector(".smart-element").disabled = true;
        dateEndEditor.querySelector(".smart-element").disabled = true;
        allDayEditor.classList.add("smart-hidden");
        conferenceEditor.classList.add("smart-hidden");
        backgroundColorEditor.classList.add("smart-hidden");
        statusEditor.classList.add("smart-hidden");
        labelEditor.querySelector(".smart-element").placeholder =
          "Enter a label...";
        descriptionEditor.querySelector(".smart-element").placeholder =
          "Enter a reason...";
        okButton.disabled = false;

        // ====================================================
        // Apply : Default form modifications
        // ====================================================
        function existingAppLabelCheck(eventt) {
          console.log("existingAppLabelCheck");
          let exist_res = existingApplication(eventt);

          if (exist_res[0] == 400) {
            okButton.disabled = true;
            document.getElementById("schedulerWindowContent").classList.add("smart-disabled");
            alert('Application already exists!');
            labelEditor.querySelector(".smart-element").value = exist_res[1]["label"]
            descriptionEditor.querySelector(".smart-element").value = exist_res[1]["staff_apply_reason"]
            if (exist_res[1]["label"] == "AM") {
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(13, 0, 0);
            } else if (exist_res[1]["label"] == "PM") {
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(14, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(18, 0, 0);
            } else {
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(18, 0, 0);
            }
          } else {
            document.getElementById("schedulerWindowContent").classList.remove("smart-disabled");
            //AM PM hours restriction of application creation from clicking in the scheduler
            if (eventt.detail.item.label == "FULL") {
              labelEditor.querySelector(".smart-element").value = "FULL"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(18, 0, 0);
            } else if (eventt.detail.item.label == "AM" || selectedDate.getHours() <= 12) {
              // Set the hours to 8 AM - 12PM for AM 
              labelEditor.querySelector(".smart-element").value = "AM"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(13, 0, 0);
            } else if (eventt.detail.item.label == "PM" || selectedDate.getHours() <= 18) {
              // Set the hours to 2 PM - 6 PM for PM 
              labelEditor.querySelector(".smart-element").value = "PM"
              // classEditor.querySelector(".smart-element").value = "Pending"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(14, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedSchedulerEvent.dateEnd.setHours(18, 0, 0);
            }
          }
        }
        existingAppLabelCheck(event);


        //AM PM FULL event listener
        if (!labelEditor.querySelector(".smart-element").hasListener) {
          labelEditor.querySelector(".smart-element").addEventListener("change", function (event) {
            var mockEndDate = selectedSchedulerEvent.dateEnd;
            // document.getElementById("schedulerWindowContent").classList.add("smart-disabled");
            if (labelEditor.querySelector(".smart-element").value == "AM") {
              // Set the hours to 8 AM - 12PM for AM 
              labelEditor.querySelector(".smart-element").value = "AM"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(13, 0, 0);
              mockEndDate.value = mockEndDate.setHours(13, 0, 0);
            } else if (labelEditor.querySelector(".smart-element").value == "PM") {
              // Set the hours to 2 PM - 6 PM for PM 
              labelEditor.querySelector(".smart-element").value = "PM"
              // classEditor.querySelector(".smart-element").value = "Pending"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(14, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(18, 0, 0);
              mockEndDate.value = mockEndDate.setHours(18, 0, 0);
            } else {
              labelEditor.querySelector(".smart-element").value = "FULL"
              // classEditor.querySelector(".smart-element").value = "Pending"
              descriptionEditor.querySelector(".smart-element").value = "Working From Home"
              dateStartEditor.querySelector(".smart-element").value = selectedDate.setHours(9, 0, 0);
              dateEndEditor.querySelector(".smart-element").value = selectedDate.setHours(18, 0, 0);
              mockEndDate.value = mockEndDate.setHours(18, 0, 0);
            }

            // Mock data for event.detail.item
            let mockItem = {
              label: event.detail.label,                 // Example label
              dateEnd: mockEndDate,    // End time
            };
            let mockEvent = {
              detail: {
                item: mockItem  // Include the mock item in the detail object
              }
            };
            existingAppLabelCheck(mockEvent);
          })
        }
        labelEditor.querySelector(".smart-element").hasListener = true;


        // [Form Validation] ---  set ID for all fields since they're all dynamic 凸(⊙▂⊙✖ )   (╯'□')╯︵ ┻━┻   ദ്ദി ༎ຶ‿༎ຶ )
        const smartInputs = mainSectionEditor.querySelectorAll('textarea'); //List of fields tha needs validation

        descriptionEditor.querySelector("textarea").id = "applyReason";
        if (!descriptionEditor.querySelector("textarea").hasListener) {
          descriptionEditor.querySelector("textarea")
            .addEventListener("input", function () {
              ApplyformValidation(event);
            });
        }
        descriptionEditor.querySelector("textarea").hasListener = true;




        // ==========================================================================================================
        //                              Withdrawal Window Event Listeners and Setttings
        // ==========================================================================================================

        // ====================================================
        // Withdraw: modify delete button to withdraw button
        // ====================================================
        withdrawButton.id = "withdrawButton"; // set id first so the event listener can find it
        // Check if the button is hidden before attempting to modify it
        if (!withdrawButton.classList.contains("smart-hidden")) { // button initally hidden
          withdrawButton.classList.remove('delete'); // detach button from itemRemove event listener
          withdrawButton.querySelector("button").innerHTML = '<span class="smart-icon"></span>Withdraw'; // Change the text from "Delete" to "Withdraw"
        } else if (withdrawButton.classList.contains("smart-hidden") && selectedSchedulerEvent.class == null) {
          withdrawButton.classList.remove("smart-hidden");
          withdrawButton.classList.remove('delete'); // detach button from itemRemove event listener
          withdrawButton.querySelector("button").innerHTML = '<span class="smart-icon"></span>Withdraw'; // Change 
          withdrawButton.disabled = true;
        }

        // Function to calculate the difference in days between currentDate and another date
        function isDateDifferenceMoreThan14Days(dateEnd) {
          const currentDate = new Date(); // Get the current date
          const oneDayInMs = 24 * 60 * 60 * 1000; // Hours * Minutes * Seconds * Milliseconds
          const dayDifference = Math.floor((new Date(dateEnd) - currentDate) / oneDayInMs);
          return Math.abs(dayDifference) > 14; // Return true if the difference is less than 14 days
        }

        if (schedulerEvent.class == "Pending_Withdrawal" || schedulerEvent.class == "Rejected" || schedulerEvent.class == "Withdrawn" || (schedulerEvent.class == "Approved" && isDateDifferenceMoreThan14Days(schedulerEvent.dateEnd)) || selectedSchedulerEvent.class == null) {
          document.getElementById("withdrawButton").disabled = true;
        } else {
          document.getElementById("withdrawButton").disabled = false;
        }
        // ======================================
        // Withdraw [EL]: Open Withdraw window
        // ======================================

        if (!withdrawButton.hasListener) {
          document
            .getElementById("withdrawButton")
            .addEventListener("click", function () {
              multilinePromptWindow.opened
                ? multilinePromptWindow.close()
                : multilinePromptWindow.open();
            });
          // for withdrawal
        }
        withdrawButton.hasListener = true;
      })




      // (code start) - startcode to customise the repeatFreq ---------------------------------------------------------------
      // code must be seperate from the previous one as the second part of the form is not revealed yet
      scheduler.addEventListener("editDialogOpen", function (event) {
        const editors = event.detail.editors;

        if (!editors) {
          return;
        }

        const dateStartEditor = editors.dateStart,
          repeatEditor = editors.repeat,
          repeatEndEditor = editors.repeatEnd,
          repeatEndAfterEditor = editors.repeatEndAfter,
          repeatEndOnEditor = editors.repeatEndOn,
          repeatFreqEditor = editors.repeatFreq,
          repeatIntervalEditor = editors.repeatInterval,
          repeatOnEditor = editors.repeatOn,
          selectedDate = new Date(dateStartEditor.querySelector(".smart-element").getAttribute("value"));

        function restrictRepeatSection() {
          repeatFreqEditor.querySelector("smart-input").defaultValue = "Weekly"; // Default the repeat frequency to weekly
          repeatFreqEditor.querySelector("smart-input").setAttribute("selected-value", "weekly"); // Default the repeat frequency to weekly
          repeatFreqEditor.querySelector("smart-input").disabled = true; // Disable repeat frequency selection
          repeatOnEditor.querySelector("smart-button-group").disabled = true; // Disabled selection to which day to repeat (Repeat On)
          repeatEndEditor.querySelector("smart-radio-button").classList.add("smart-hidden"); // hide 'Never' option for End Repeat section
          repeatEndAfterEditor.classList.add("smart-hidden"); // hide 'After' option for End Repeat section
          repeatEndOnEditor.querySelector("smart-radio-button").checked = true; // hide 'Never' option for end of repeat date
          repeatEndOnEditor.querySelector("smart-date-time-picker").setAttribute("min", selectedSchedulerEvent.dateStart); // set min date to application date for calendar selectable in End Repeat section
          repeatEndOnEditor.querySelector("smart-date-time-picker").setAttribute("max", new Date(maxEndDate).setDate(maxEndDate.getDate() - 1)); // set max date to +3 mths for calendar selectable in End Repeat section
          repeatEndOnEditor.querySelector("smart-date-time-picker").value = selectedSchedulerEvent.dateEnd; // set date to application date as default is today's date
          repeatIntervalEditor.querySelector("smart-number-input").setAttribute("max", 1);// set max weeks interval to +3 mths/12 weeks for calendar selectable in End Repeat section
          repeatIntervalEditor.querySelector("smart-number-input").disabled = true;
        }
        restrictRepeatSection();
        repeatEditor.querySelector(".smart-element").checked = false;
        if (!repeatEditor.querySelector(".smart-element").hasListener) {
          repeatEditor.querySelector(".smart-element").addEventListener("click", function () {
            if (repeatEditor.querySelector(".smart-element").checked == true) {
              restrictRepeatSection();
              console.log("Repeat toggle button is checked");
            } else {
              console.log("Repeat button unchecked");
            }
          })
        }
        repeatEditor.querySelector(".smart-element").hasListener = true;


        if (!repeatEndOnEditor.querySelector("smart-date-time-picker").hasListener) {
          repeatEndOnEditor.querySelector("smart-date-time-picker")
            .addEventListener("change", function (event) {
              event.target.close();
            })
        }
        repeatEndOnEditor.querySelector("smart-date-time-picker").hasListener = true;
      })
      // [APPLY] - (code end) - end code to customise the create new event form ---------------------------------------------------------------------------------


      // ===============================================
      // Withdraw [EL]: Open and close Withdraw form window
      // ===============================================
      multilinePromptWindow.addEventListener("click", dialogButtonsHandler);
      function dialogButtonsHandler(event) {
        const target = event.target, // !!! its a whole different event from scheduler btw
          textbox = target.ownerElement,
          withdrawReason = textbox.value;
        if (target.closest(".smart-cancel-button")) {
          this.close();
        } else if (target.closest(".smart-confirm-button")) {
          withdrawtoBE(withdrawReason);
          this.close();
        }
      }

      // =====================================================
      // Withdraw [EL]: Form Validation for Withdrawal Window
      // =====================================================

      multilinePromptWindow.addEventListener("open", function () {
        const
          withdrawOkButton = multilinePromptWindow.querySelector(".smart-confirm-button"),
          withdrawReasonTextbox = multilinePromptWindow.querySelector("textarea");
        multilinePromptWindow.querySelector("textarea").id = "withdrawReasonTextbox"
        multilinePromptWindow.setAttribute("value", "")
        withdrawOkButton.disabled = true;
        if (!withdrawReasonTextbox.hasListener) {
          withdrawReasonTextbox
            .addEventListener("input", function () {
              if (multilinePromptWindow.querySelector("textarea").value != "") {
                multilinePromptWindow.querySelector(".smart-confirm-button").disabled = false;
              }
            })
        }
        withdrawReasonTextbox.hasListener = true;
      })




      // [Functionalities] - scheduler basic funtionaities code -------------------------------------------------------------------------------------------------
      document
        .getElementById("toggleButton")
        .addEventListener("click", function () {
          primaryContainer.classList.toggle("collapse");
          scheduler.disableDateMenu = !primaryContainer.classList.contains(
            "collapse"
          );
        });

      document
        .getElementById("calendar")
        .addEventListener("change", function (event) {
          scheduler.dateCurrent = event.detail.value;
        });

      document.getElementById("tree").addEventListener("change", function (event) {
        const tree = event.target,
          types = tree.selectedIndexes.map((i) => tree.getItem(i).value);
        scheduler.dataSource = filterSchedulerData(data.value, types);
      });

      scheduler.addEventListener("itemUpdate", updateData);
      // scheduler.addEventListener("itemRemove", withdrawtoBE); // withdraw
      scheduler.addEventListener("itemInsert", insertData); //fire to backend for apply wfh

      //Update the Calendar date
      scheduler.addEventListener("dateChange", function (event) {
        calendar.selectedDates = [event.detail.value];
      });


      function updateData(event) {
        const item = event.detail.item;
        for (let i = 0; i < this.events.length; i++) {
          const dataItem = this.events[i];
          if (dataItem.label === item.label && dataItem.class === item.class) {
            event.type === "itemRemove"
              ? this.events.splice(i, 1)
              : this.events.splice(i, 1, item);
            deleteData(event)
            return;
          }
        }
      }

      // [Apply] - form validation functions -------------------------------------------------------------------------------------------------------
      function ApplyformValidation(event) {
        console.log("Apply form validation function called");

        const rules = [
          { input: "#applyReason", message: 'Reason is required!', action: 'input, blur', type: 'required' }],
          validator = new Smart.Utilities.Validator(rules),
          okButton = document.querySelector('.smart-scheduler-window-button.ok.primary.smart-element.smart-button');

        // Validate all inputs
        const isValid = validator.validate(); // Validate and get the result
        if (!isValid) {
          // Alert user about validation errors
          okButton.disabled = true;
          // alert('Please fill in all required fields!');
        } else if (existingApplication(event)[0] == 400) {
          okButton.disabled = true;
          alert('Application already exists!');
        } else {
          console.log("passed form validation");
          okButton.disabled = false;
          return isValid
        }
      }

      // [Apply] - checking existing application function
      function existingApplication(eventt) {
        return exist_check(eventt, data)
      }



      // [BE] - DB connection / functinalities codes-------------------------------------------------------------------------------------------------------
      // Firing to the backend to update
      function insertData(event) {
        const newEvent = event.detail.item;  // This contains the newly inserted event

        console.log("New event added:", newEvent);
        let endDate
        if (newEvent.repeat && newEvent.repeat.repeatEnd) {
          endDate = newEvent.repeat.repeatEnd
        } else if (newEvent.label === "FULL") {
          event.detail.item.dateStart.setHours(9, 0, 0);
          event.detail.item.dateEnd.setHours(18, 0, 0);
          newEvent.dateStart.setHours(9, 0, 0);
          newEvent.dateEnd.setHours(18, 0, 0);
          endDate = newEvent.dateEnd;
        }
        else {
          endDate = newEvent.dateEnd
        }
        console.log("NewEvent after:", newEvent);
        console.log("event.detail.item after:", event.detail.item);

        // Example data structure for API call
        const eventData = {
          "time_slot": newEvent.label,
          "start_date": newEvent.dateStart,
          "end_date": endDate,
          "apply_reason": newEvent.description
        };
        ~
          console.log("resulting json structure", eventData);

        // Call an API to save the new event to the backend
        if (ApplyformValidation(event)) {
          console.log("reach apply submission axios");
          console.log(event);
          axios.post(`${baseURL}/application/apply/${staff_id}`, eventData, {
            headers: {
              'Content-Type': 'application/json',
            }
          })
            .then(response => {
              console.log("Event saved successfully:", response.data);
              alert('Sucessful application!');
              setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
            })
            .catch(error => {
              if (error.response) {
                // The request was made and the server responded with a status code out of the 2xx range
                console.log('Error status:', error.response.status);
                console.log('Error response data:', error.response.data);
                alert('Error - ' + error.response.data.error);
                setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
                return error.response.status;
              }
            })
        }
      }

      function withdrawtoBE(withdrawReason) {
        const withdrawEvent = selectedSchedulerEvent;  // This contains the newly inserted event

        console.log("Event withdraw triggered:", withdrawEvent);
        console.log("withdrawReason:", withdrawReason);
        // let endDate = newEvent.dateEnd


        // Example data structure for API call
        const eventData = {
          "time_slot": withdrawEvent.label,
          "staff_withdraw_reason": withdrawReason,
          "date": withdrawEvent.dateStart.toISOString(),
          "status": withdrawEvent.class,
        };

        const jsonString = JSON.stringify(eventData);
        console.log("resulting json structure", jsonString);

        // [Withdrawal - BE] - axios call to send withdrawal form data to db to update
        axios.post(`${baseURL}/application/withdraw/${staff_id}`, jsonString, {
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(response => {
            console.log("Event withdrawn successfully:", response.data);
            let key = Object.keys(response.data)[0]; // Get the first key in the object  // 15 OCT
            alert(response.data[key]); // 15 OCT
            setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
          })
          .catch(error => {
            if (error.response) {
              // The request was made and the server responded with a status code out of the 2xx range
              console.log('Error status:', error.response.status);
              console.log('Error response data:', error.response.data);
              alert('Error - ' + error.response.data);
              setInterval(function () { location.reload(); }, 1000); // 1000 milliseconds = 1 second
            }
          })
      }
    });

  }
}
</script>


<style>
/* Add this CSS to your stylesheet */
.loading {
  position: fixed;
  /* Keep it fixed on the screen */
  top: 10%;
  left: 50%;
  transform: translate(-50%, -50%);
  /* Center the loading icon */
  z-index: 1000;
  /* Ensure it's above other elements */
}

.spinner {
  width: 50px;
  /* Size of the spinner */
  height: 50px;
  border: 5px solid rgba(255, 255, 255, 0.3);
  /* Light color for the spinner */
  border-top: 5px solid #3498db;
  /* Spinner color */
  border-radius: 50%;
  /* Circular spinner */
  animation: spin 1s linear infinite;
  /* Spin animation */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* Normal state styles */
button.smart-button.smart-element.smart-confirm-button.flat {
  /* withdrawal form submission button */
  background: black;
  /* Normal background color */
  color: white;
  /* Normal text color */
}

/* Disabled state styles */
button.smart-button.smart-element.smart-confirm-button.flat:disabled {
  /* withdrawal form submission button */
  background: gray;
  /* Change this to your desired disabled background color */
  color: darkgray;
  /* Change this to your desired disabled text color */
  cursor: not-allowed;
  /* Change cursor to indicate it's not clickable */
  opacity: 0.6;
  /* Optional: make it slightly transparent */
}

.smart-multiline-prompt-window.smart-window .smart-content-container>.smart-content {
  padding-top: 20px;
}

.smart-multiline-prompt-window.smart-window smart-multiline-text-box {
  height: 100%;
}

.smart-window button,
.smart-dialog-window.smart-window .smart-button.material,
.smart-progress-window.smart-window .smart-button.material,
.smart-alert-window.smart-window .smart-button.material,
.smart-prompt-window.smart-window .smart-button.material,
.smart-multiline-prompt-window.smart-window .smart-button.material {
  padding-top: 4px;
  padding-bottom: 4px;
}

.smart-multiline-prompt-window.smart-window.material smart-multiline-text-box {
  width: 100%;
}


html,
body {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  --smart-scheduler-timeline-cell-min-width: 40px;
  --smart-scheduler-event-border-radius: 4px;
  --smart-scheduler-timeline-nonworking-color: var(--smart-background);
}


#app,
.vue-root {
  height: 93%;
}

.smart-scheduler {
  width: 100%;
  height: 100%;
  border-radius: initial;
}


#schedulerWindowContent>div>div.smart-scheduler-window-main>div:nth-child(4) {
  /* css for repeat button */
  display: flex;
  justify-content: flex-end;
  /* Align items to the right */
  align-items: center;
  /* Vertically center align the label and switch */
}

#primaryContainer,
#primaryContainer .content {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
}

#primaryContainer {
  width: 100%;
  height: 100%;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
}

#primaryContainer .content {
  height: calc(100% - 50px);
}

#primaryContainer.collapse #sideA {
  width: 0;
}

#primaryContainer #sideA {
  width: 280px;
  transition: width 0.2s ease-in-out;
}

#primaryContainer.collapse #sideB {
  width: 100%;
  transition: width 0.2s ease-in-out;
}

#primaryContainer #sideB {
  width: calc(100% - 280px);
  transition: width 0.2s ease-in-out;
}

#sideA,
#sideB {
  height: 100%;
  box-sizing: border-box;
}

#header {
  position: relative;
  width: 100%;
  height: 50px;
  background-color: var(--smart-background);
  color: var(--smart-background-color);
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

#sideA {
  border-top: var(--smart-border-width) solid var(--smart-border);
}

#sideA .controls-container {
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
  max-height: calc(100% - 150px);
  display: grid;
  grid-template-rows: repeat(3, auto);
  grid-template-columns: 100%;
  grid-row-gap: 20px;
  overflow: auto;
}

.button-container {
  height: auto;
}

#sideA .smart-calendar {
  min-width: initial;
  max-width: 100%;
  height: 250px;
  min-height: initial;
  --smart-font-size: 12px;
  --smart-calendar-cell-size: 26px;
  --smart-calendar-cell-spacing: 4px;
  border: initial;
  --smart-surface: transparent;
}

.smart-input,
.smart-tree {
  width: 100%;
}

.smart-tree {
  height: auto;
  border: initial;
}

#toggleButton {
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: initial;
  background: transparent;
  margin-right: 10px;
}

#toggleButton::after {
  content: var(--smart-icon-align-left);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-family: var(--smart-font-family-icon);
  font-size: 25px;
  box-sizing: border-box;
  pointer-events: none;
}

#title {
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  font-size: 20px;
  position: relative;
}

#logo {
  content: "";
  position: relative;
  width: 100%;
  height: 90px;
  background: url(https://www.htmlelements.com/wp-content/design/assets/images/csssprites.png) -465px -400px;
  filter: invert(0.8);
  box-sizing: border-box;
}

.smart-tree[selection-mode="checkBox"] smart-tree-items-group>.smart-tree-item-label-container::before,
.smart-tree[selection-mode="checkBox"] smart-tree-items-group>.smart-tree-item-label-container::after {
  content: initial !important;
}

.smart-tree .smart-tree-item[value="Approved"] {
  --smart-primary: green;
}

.smart-tree .smart-tree-item[value="Pending_Approval"] {
  --smart-primary: cornflowerblue;
}

/* .smart-tree .smart-tree-item[value="Rejected"] {
  --smart-primary: firebrick;
} */

.smart-tree .smart-tree-item[value="Pending_Withdrawal"] {
  --smart-primary: lightsteelblue;
}


/* .smart-tree .smart-tree-item[value="Withdrawn"] {
  --smart-primary: lightgrey;
} */


.Approved {
  --smart-scheduler-event-background-rgb: 0, 129, 0;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

.Pending_Approval {
  --smart-scheduler-event-background-rgb: 100, 149, 237;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

/* .Rejected {
  --smart-scheduler-event-background-rgb: 178, 34, 34;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
} */

.Pending_Withdrawal {
  --smart-scheduler-event-background-rgb: 176, 196, 222;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
}

/* .Withdrawn {
  --smart-scheduler-event-background-rgb: 211, 211, 211;
  --smart-scheduler-event-background: rgba(var(--smart-scheduler-event-background-rgb),
      1);
  --smart-scheduler-event-focus: rgba(var(--smart-scheduler-event-background-rgb),
      0.9);
  --smart-scheduler-event-hover: rgba(var(--smart-scheduler-event-background-rgb),
      0.8);
} */
</style>