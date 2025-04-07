<template>
    <div class="vue-root">
        <div :id="primaryContainerId" class="scheduler-container">
            <div id="header">
                <smart-button id="toggleButton"></smart-button>
                <div id="title">Scheduler</div>
                <smart-button id="addNew" class="floating">
                    <span>Create</span>
                </smart-button>
            </div>
            <div class="content">
                <section id="sideA">
                    <div class="button-container">
                        <div id="logo"></div>
                    </div>
                    <div class="controls-container">
                        <smart-calendar id="calendar"></smart-calendar>
                        <smart-input id="searchBar" class="underlined" placeholder="Search for people"></smart-input>
                        <smart-tree id="tree" selection-mode="checkBox" toggle-element-position="far">
                            <smart-tree-items-group expanded>
                                My calendars
                                <smart-tree-item value="birthday" selected>
                                    Birthdays
                                </smart-tree-item>
                                <smart-tree-item value="holiday" selected>
                                    Holidays
                                </smart-tree-item>
                                <smart-tree-item value="event" selected>
                                    Events
                                </smart-tree-item>
                            </smart-tree-items-group>
                        </smart-tree>
                    </div>
                </section>
                <section id="sideB">
                    <div :id="schedulerId" class="scheduler-container"></div>
                </section>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import "smart-webcomponents/source/styles/smart.default.css";
import "smart-webcomponents/source/modules/smart.button.js";
import "smart-webcomponents/source/modules/smart.calendar.js";
import "smart-webcomponents/source/modules/smart.input.js";
import "smart-webcomponents/source/modules/smart.tree.js";
import "smart-webcomponents/source/modules/smart.scheduler.js";

export default {
    name: "AppScheduler",
    props: {
        schedulerId: {
            type: String,
            default: "smart-scheduler",
        },
        primaryContainerId: {
            type: String,
            default: "primaryContainer",
        },
        events: {
            type: Array,
            required: true,
            default: () => [
                {
                    label: "Team Meeting",
                    dateStart: new Date(2024, 9, 1, 10, 0),
                    dateEnd: new Date(2024, 9, 1, 11, 0),
                    description: "Monthly team sync-up",
                    class: "event"
                },
            ],
        },
    },

    data() {
        const today = new Date();
        const currentDate = today.getDate();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth();

        const thanksgiving = (() => {
            const tempDate = new Date(currentYear, 10, 1);
            // 4th Thursday of November
            tempDate.setDate(tempDate.getDate() - tempDate.getDay() + 25);
            return tempDate;
        })();

        return {
            today,
            currentDate,
            currentYear,
            currentMonth,
            thanksgiving,
            scheduler: null,
        };
    },

    mounted() {
        const schedulerElement = document.getElementById(this.schedulerId);
        const primaryContainer = document.getElementById(this.primaryContainerId);
        const calendar = document.getElementById("calendar");

        // Destroy existing scheduler instance, if any
        if (schedulerElement.scheduler) {
            schedulerElement.scheduler.destroy();
        }

        // Initialize Smart Scheduler
        this.scheduler = new window.Smart.Scheduler(schedulerElement, {
            view: "month",
            dataSource: this.events,
            views: ["day", "week", "month"],
            currentTimeIndicator: true,
            firstDayOfWeek: 1,
        });

        document
            .getElementById("toggleButton")
            .addEventListener("click", () => {
                primaryContainer.classList.toggle("collapse");
                schedulerElement.disableDateMenu = !primaryContainer.classList.contains("collapse");
            });

        document.getElementById("addNew").addEventListener("click", () => {
            this.scheduler.openWindow({
                class: "event",
            });
        });

        calendar.addEventListener("change", (event) => {
            this.scheduler.dateCurrent = event.detail.value;
        });

        document.getElementById("tree").addEventListener("change", (event) => {
            const tree = event.target,
                types = tree.selectedIndexes.map((i) => tree.getItem(i).value);
            this.scheduler.dataSource = this.events.filter(
                (d) => types.indexOf(d.class) > -1
            );
        });

        // Add event listeners for updating data
        this.scheduler.addEventListener("dragEnd", this.updateData);
        this.scheduler.addEventListener("resizeEnd", this.updateData);
        this.scheduler.addEventListener("itemUpdate", this.updateData);
        this.scheduler.addEventListener("itemRemove", this.updateData);

        // Update the Calendar date
        this.scheduler.addEventListener("dateChange", (event) => {
            calendar.selectedDates = [event.detail.value];
        });
    },

    methods: {
        updateData(event) {
            const item = event.detail.item;

            for (let i = 0; i < this.events.length; i++) {
                const dataItem = this.events[i];
                if (dataItem.label === item.label && dataItem.class === item.class) {
                    event.type === "itemRemove"
                        ? this.events.splice(i, 1)
                        : this.events.splice(i, 1, item);
                    return;
                }
            }
        },

        getPastThreeWeekdays(weekday) {
            let weekdays = [];

            for (let i = 0; i < 3; i++) {
                weekdays.push((weekday - i + 7) % 7);
            }
            return weekdays;
        },
    },
};
</script>

<style>
/* Add your styles here */
</style>