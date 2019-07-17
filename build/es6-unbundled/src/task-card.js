define(["../node_modules/@polymer/polymer/polymer-element.js"],function(_polymerElement){"use strict";class TaskCard extends _polymerElement.PolymerElement{static get template(){return _polymerElement.html`
      <style>
        .card {
          background-color: white;
          height: 10vh;
          color: gray;
          border-radius: 5px;
          margin: 10px;
          margin-bottom: 15px;
          padding: 10px;
          position: relative;
          box-shadow: 5px 5px 10px 4px rgba(0, 0, 0, 0.5);
          transition: height 0.5s;
        }

        .card:hover {
          height: auto;
        }

        .taskDescription {
          font-family: "Arvo", Serif;
          font-size: 0.8em;
          margin: 10px;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0 linear 300ms, opacity 0.7s 0.5s;
        }

        .card:hover .taskDescription {
          visibility: visible;
          opacity: 1;
        }

        h3 {
          font-size: 1.15em;
          font-weight: bold;
        }

        .title,
        .date {
          text-align: left;
        }

        .name {
          color: white;
          display: inline-block;
          padding: 3px 15px;
          min-width: 50px;
          text-align: center;
          text-transform: uppercase;
          font-size: 0.7em;
          position: absolute;
          top: -10px;
          left: 10px;
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
          font-family: "Arvo", Serif;
          border-radius: 2px;
        }

        .turquoise {
          background: #07beb8;
        }

        .orange {
          background: #f3ca40;
        }

        .green {
          background: #21cf5b;
        }

        .blue {
          background: hsl(239, 82%, 44%);
        }

        @media only screen and (max-width: 680px) {
          h2 {
            font-size: 1em;
          }

          h3 {
            font-size: 0.8em;
          }

          .name {
            font-size: 0.6em;
          }

          .date,
          .stats,
          .btn {
            font-size: 0.7em;
            cursor: pointer;
            position: absolute;
            top: 10vh;
            left: 2vw;
            height: 3vh;
            width: 10vw;
            text-align: center;
            background: whitesmoke;
            color: #24294a;
            border-radius: 10px;
          }
        }
      </style>
      <div class="card">
        <button class="btn" on-click="deleteTask">Delete</button>
        <div class$="name {{color}}">[[user]]</div>
        <h3 class="title">[[title]]</h3>
        <p class="date">[[date]]</p>
        <section class="taskDescription">
          <slot></slot>
          <paper-dropdown-menu
            on-iron-select="changeStatus"
            label="Status"
            value="[[status]]"
          >
            <paper-listbox slot="dropdown-content" class="dropdown-content">
              <paper-item>Backlog</paper-item>
              <paper-item>In Progress</paper-item>
              <paper-item>Complete</paper-item>
            </paper-listbox>
          </paper-dropdown-menu>
        </section>
      </div>
    `}static get properties(){return{user:String,title:String,date:String,color:String}}changeStatus(event){const temp=event.target.selectedItem.innerText,id=this.id,detail={id:id,status__c:temp},newEvent=new CustomEvent("status change",{detail:detail,bubbles:!0,composed:!0});this.dispatchEvent(newEvent)}deleteTask(event){const id=this.id;console.log(id);const detail={id:id};console.log("task card delete task called");const newEvent=new CustomEvent("new delete",{detail:detail,bubbles:!0,composed:!0});this.dispatchEvent(newEvent)}constructor(){super()}}customElements.define("task-card",TaskCard)});