/*
 * Copyright 2022 Google LLC. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

/**
 * @fileoverview Code for JourneySharing demo options.
 *
 * Options - Class that contains demo options
 *
 * OptionsModal - Class that injects HTML for an options modal and handles
 *                changes to various demo options
 *
 * ShipmentTrackingOptionsModal - Class that extends OptionsModal
 *
 * TripTrackingOptionsModal - Class that extends OptionsModal
 */

const DEFAULT_POLLING_INTERVAL_MS = 5000;
const MIN_POLLING_INTERVAL_MS = 5000;
const ICON_OPTION_NAMES = [
  'defaultVehicleIcon', 'defaultDestinationIcon', 'defaultWaypointIcon',
  'defaultSuccessfulTaskIcon', 'defaultUnsuccessfulTaskIcon',
  'defaultTaskOutcomeIcon'
];
const ICON_OPTIONS = {
  defaultVehicleIcon: {
    path: 'M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z',
    fillOpacity: 0.9,
    scale: 1.2,
    fillColor: '#4285f4',
    anchor: {x: 12, y: 12},
  },
  defaultDestinationIcon: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 0.9,
    scale: 1.5,
    fillColor: '#ea4335',
    anchor: {x: 12, y: 23},
  },
  defaultWaypointIcon: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 0.9,
    scale: 1.5,
    fillColor: '#03a9f4',
    anchor: {x: 12, y: 23},
  },
  defaultSuccessfulTaskIcon: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-  7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 0.9,
    scale: 1.5,
    fillColor: '#41b375',
    anchor: {x: 12, y: 23},
  },
  defaultUnsuccessfulTaskIcon: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 0.9,
    scale: 1.5,
    fillColor: '#e67C73',
    anchor: {x: 12, y: 23},
  },
  defaultTaskOutcomeIcon: {
    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.' +
        '13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.' +
        '12 2.5 2.5-1.12 2.5-2.5 2.5z',
    fillOpacity: 0.9,
    scale: 1.5,
    fillColor: '#bababa',
    anchor: {x: 12, y: 23},
  }
};

/**
 * @return {!object}
 */
function getUrlQueryParams() {
  const queryParams = window.location.search.replace('?', '').split('&');
  const urlQueryParams = {};

  queryParams.forEach((param) => {
    if (param !== '') {
      const [key, value] = param.split('=');
      urlQueryParams[key] = value;
    }
  });

  return urlQueryParams;
}

/**
 * @param {boolean} pollingIntervalMillis
 * @return {boolean}
 */
function isValidPollingInterval(pollingIntervalMillis) {
  return pollingIntervalMillis != null &&
      pollingIntervalMillis >= MIN_POLLING_INTERVAL_MS;
}

class Options {
  /**
   * @param {!object} options
   */
  constructor(options) {
    this.pollingIntervalMillis =
        isValidPollingInterval(options.pollingIntervalMillis) ?
        options.pollingIntervalMillis :
        DEFAULT_POLLING_INTERVAL_MS;
    this.showAnticipatedRoutePolyline =
        options.showAnticipatedRoutePolyline == null ||
        options.showAnticipatedRoutePolyline === 'true';
    this.showTakenRoutePolyline = options.showTakenRoutePolyline == null ||
        options.showTakenRoutePolyline === 'true';
    this.showTasks = options.showTasks == null || options.showTasks === 'true';
    this.showOutcomeLocations = options.showOutcomeLocations == null ||
        options.showOutcomeLocations === 'true';
    this.vehicleIcon = options.vehicleIcon || 'defaultVehicleIcon';
    this.destinationIcon = options.destinationIcon || 'defaultDestinationIcon';
    this.waypointIcon = options.waypointIcon || 'defaultWaypointIcon';
    this.successfulTaskIcon =
        options.successfulTaskIcon || 'defaultSuccessfulTaskIcon';
    this.unsuccessfulTaskIcon =
        options.unsuccessfulTaskIcon || 'defaultUnsuccessfulTaskIcon';
    this.taskOutcomeIcon = options.taskOutcomeIcon || 'defaultTaskOutcomeIcon';
  }
}

class OptionsModal {
  /**
   * @param {!object} options
   * @param {string} optionsModalContainerElementId
   */
  constructor(options, optionsModalContainerElementId) {
    this.options = new Options(options);
    this.mapView = null;

    // Modal state
    this.newOptions = {};
    this.changedOptions = {};
    this.originalAnticipatedRoutePolylineVisibility =
        this.options.showAnticipatedRoutePolyline;
    this.originalTakenRoutePolylineVisibility =
        this.options.showTakenRoutePolyline;
    this.showTasks = this.options.showTasks;
    this.showOutcomeLocations = this.options.showOutcomeLocations;

    // Modal elements
    this.modal = null;
    this.confirmButton = null;
    this.cancelButton = null;
    this.pollingIntervalMillisField = null;
    this.showAnticipatedRoutePolylineField = null;
    this.showTakenRoutePolylineField = null;
    this.vehicleIconField = null;
    this.destinationIconField = null;

    this.initModal_(optionsModalContainerElementId);
  }

  /**
   * @param {!JourneySharingMapView} mapView
   */
  setMapView(mapView) {
    this.mapView = mapView;
  }

  /**
   * Inserts the options modal HTML into the document at the container element
   * id. Also binds some event handlers.
   *
   * @private
   * @param {string} optionsModalContainerElementId
   */
  async initModal_(optionsModalContainerElementId) {
    const container = document.getElementById(optionsModalContainerElementId);
    if (!container) {
      return;
    }

    const optionsHtml = await fetch('options_fleet.html');
    container.innerHTML = await optionsHtml.text();

    // Modal elements
    this.modal = document.getElementById('options-modal');
    this.confirmButton =
        document.getElementById('options-modal__confirm-button');
    this.cancelButton = document.getElementById('options-modal__cancel-button');
    this.pollingIntervalMillisField =
        document.getElementById('polling-interval-ms');
    this.showAnticipatedRoutePolylineField =
        document.getElementById('show-anticipated-route-polyline');
    this.showTakenRoutePolylineField =
        document.getElementById('show-taken-route-polyline');
    this.showTasksField = document.getElementById('show-tasks');
    this.showOutcomeLocationsField =
        document.getElementById('show-outcome-locations');
    this.vehicleIconField = document.getElementById('vehicle-icon-selector');
    this.destinationIconField =
        document.getElementById('destination-icon-selector');
    this.waypointIconField = document.getElementById('waypoint-icon-selector');
    this.successfulTaskIconField =
        document.getElementById('successful-task-icon-selector');
    this.unsuccessfulTaskIconField =
        document.getElementById('unsuccessful-task-icon-selector');
    this.taskOutcomeIconField =
        document.getElementById('task-outcome-icon-selector');

    window.onclick = (e) => {
      if (e.target == this.modal) {
        this.hideOptionsModal_();
      }
    };

    this.cancelButton.onclick = (e) => {
      this.hideOptionsModal_();
    };

    this.pollingIntervalMillisField.onkeydown = (e) => {
      this.resetPollingIntervalMsError_();
    };

    this.pollingIntervalMillisField.onchange = (e) => {
      const newPollingIntervalMs = this.pollingIntervalMillisField.value;
      if (isValidPollingInterval(newPollingIntervalMs)) {
        this.newOptions.pollingIntervalMillis = newPollingIntervalMs;
        this.changedOptions.pollingIntervalMillis =
            newPollingIntervalMs !== this.options.pollingIntervalMillis;
      } else {
        this.pollingIntervalMillisField.classList.add('error');
        document.getElementById('polling-interval-ms__min-val')
            .classList.add('error');
      }
    };

    this.showAnticipatedRoutePolylineField.onclick = (e) => {
      this.newOptions.showAnticipatedRoutePolyline = e.target.checked;
      this.changedOptions.showAnticipatedRoutePolyline =
          e.target.checked !== this.options.showAnticipatedRoutePolyline;
    };

    this.showTakenRoutePolylineField.onclick = (e) => {
      this.newOptions.showTakenRoutePolyline = e.target.checked;
      this.changedOptions.showTakenRoutePolyline =
          e.target.checked !== this.options.showTakenRoutePolyline;
    };

    this.showTasksField.onclick = (e) => {
      this.newOptions.showTasks = e.target.checked;
      this.changedOptions.showTasks =
          e.target.checked !== this.options.showTasks;
    };

    this.showOutcomeLocationsField.onclick = (e) => {
      this.newOptions.showOutcomeLocations = e.target.checked;
      this.changedOptions.showOutcomeLocations =
          e.target.checked !== this.options.showOutcomeLocations;
    };

    this.vehicleIconField.onchange = (e) => {
      this.newOptions.vehicleIcon = e.target.value;
      this.changedOptions.vehicleIcon =
          e.target.value !== this.options.vehicleIcon;
    };

    this.destinationIconField.onchange = (e) => {
      this.newOptions.destinationIcon = e.target.value;
      this.changedOptions.destinationIcon =
          e.target.value !== this.options.destinationIcon;
    };

    this.waypointIconField.onchange = (e) => {
      this.newOptions.waypointIcon = e.target.value;
      this.changedOptions.waypointIcon =
          e.target.value !== this.options.waypointIcon;
    };

    this.successfulTaskIconField.onchange = (e) => {
      this.newOptions.successfulTaskIcon = e.target.value;
      this.changedOptions.successfulTaskIcon =
          e.target.value !== this.options.successfulTaskIcon;
    };

    this.unsuccessfulTaskIconField.onchange = (e) => {
      this.newOptions.unsuccessfulTaskIcon = e.target.value;
      this.changedOptions.unsuccessfulTaskIcon =
          e.target.value !== this.options.unsuccessfulTaskIcon;
    };

    this.taskOutcomeIconField.onchange = (e) => {
      this.newOptions.taskOutcomeIcon = e.target.value;
      this.changedOptions.taskOutcomeIcon =
          e.target.value !== this.options.taskOutcomeIcon;
    };

    // Confirm button
    this.confirmButton.onclick = (e) => {
      Object.assign(this.options, this.newOptions);
      this.saveToHistory();
      console.log(this.options);
      location.reload();
    };
  }

  /**
   * Saves the options to the URL
   */
  saveToHistory() {
    const optionsString = '?' +
        Object.keys(this.options)
            .filter((key) => key !== '' && this.options[key] !== undefined)
            .map((key) => `${key}=${this.options[key]}`)
            .join('&');

    history.replaceState(null, null, optionsString);
  }

  /**
   * Resets options to defaults by reloading the page without query parameters.
   */
  reset() {
    window.location.href = window.location.href.split('?')[0];
  }

  /**
   * Resets the error state of the polling interval ms input
   *
   * @private
   */
  resetPollingIntervalMsError_() {
    if (this.pollingIntervalMillisField.classList.contains('error')) {
      this.pollingIntervalMillisField.classList.remove('error');
      document.getElementById('polling-interval-ms__min-val')
          .classList.remove('error');
    }
  }

  /**
   * Gets a new icon
   *
   * @param {string} iconName
   * @return {?object}
   */
  getIcon(iconName) {
    if (iconName == null || !(iconName in ICON_OPTIONS)) {
      return '';
    }
    const iconOption = ICON_OPTIONS[iconName];
    if (iconOption.url) {
      return {url: iconOption.url, scaledSize: new google.maps.Size(48, 48)};
    } else if (iconOption.path) {
      return {...iconOption};
    }
  }

  /**
   * Hides the options modal
   *
   * @private
   */
  hideOptionsModal_() {
    this.resetPollingIntervalMsError_();
    this.modal.style.display = 'none';
  }

  /**
   * Displays a modal with options for the demo.
   */
  showOptionsModal() {
    // Reset modal state
    this.newOptions = {};
    this.changedOptions = {};

    document.onkeyup = (e) => {
      if (e.key === 'Escape') {
        this.hideOptionsModal_();
        document.onkeyup = null;
      }
    };

    this.setFieldSelections_();
    this.modal.style.display = 'block';
  }

  /**
   * Initializes the modal option fields with the saved demo options.
   *
   * @private
   */
  setFieldSelections_() {
    // Polling interval
    this.pollingIntervalMillisField.value =
        isValidPollingInterval(this.options.pollingIntervalMillis) ?
        this.options.pollingIntervalMillis :
        DEFAULT_POLLING_INTERVAL_MS;

    // Polyline visibility
    this.showAnticipatedRoutePolylineField.checked =
        this.options.showAnticipatedRoutePolyline;

    this.showTakenRoutePolylineField.checked =
        this.options.showTakenRoutePolyline;

    // Task marker visibility
    this.showTasksField.checked = this.options.showTasks;
    this.showOutcomeLocationsField.checked = this.options.showOutcomeLocations;

    // Vehicle icon
    document
        .getElementById(`vehicle-icon-option-${
            this.options.vehicleIcon || 'defaultVehicleIcon'}`)
        .setAttribute('selected', 'selected');
    this.vehicleIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.vehicleIcon || 'defaultVehicleIcon');

    if (!this.mapView.vehicleMarkers.length) {
      this.vehicleIconField.setAttribute('disabled', true);
    } else {
      this.vehicleIconField.removeAttribute('disabled');
    }

    // Destination icon
    document
        .getElementById(`destination-icon-option-${
            this.options.destinationIcon || 'defaultDestinationIcon'}`)
        .setAttribute('selected', 'selected');
    this.destinationIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.destinationIcon || 'defaultDestinationIcon');

    if (!this.mapView.destinationMarkers.length) {
      this.destinationIconField.setAttribute('disabled', true);
    } else {
      this.destinationIconField.removeAttribute('disabled');
    }

    // Waypoint icon
    document
        .getElementById(`waypoint-icon-option-${
            this.options.waypointIcon || 'defaultWaypointIcon'}`)
        .setAttribute('selected', 'selected');
    this.waypointIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.waypointIcon || 'defaultWaypointIcon');

    if (!this.mapView.waypointMarkers.length) {
      this.waypointIconField.setAttribute('disabled', true);
    } else {
      this.waypointIconField.removeAttribute('disabled');
    }

    // Successful task icon
    document
        .getElementById(`successful-task-icon-option-${
            this.options.successfulTaskIcon || 'defaultSuccessfulTaskIcon'}`)
        .setAttribute('selected', 'selected');
    this.successfulTaskIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.successfulTaskIcon || 'defaultSuccessfulTaskIcon');

    if (!this.mapView.successfulTaskMarkers.length) {
      this.successfulTaskIconField.setAttribute('disabled', true);
    } else {
      this.successfulTaskIconField.removeAttribute('disabled');
    }

    // Unsuccessful task icon
    document
        .getElementById(`unsuccessful-task-icon-option-${
            this.options.unsuccessfulTaskIcon ||
            'defaultUnsuccessfulTaskIcon'}`)
        .setAttribute('selected', 'selected');
    this.unsuccessfulTaskIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.unsuccessfulTaskIcon || 'defaultUnsuccessfulTaskIcon');

    if (!this.mapView.unsuccessfulTaskMarkers.length) {
      this.unsuccessfulTaskIconField.setAttribute('disabled', true);
    } else {
      this.unsuccessfulTaskIconField.removeAttribute('disabled');
    }

    // Task outcome icon
    document
        .getElementById(`task-outcome-icon-option-${
            this.options.taskOutcomeIcon || 'defaultTaskOutcomeIcon'}`)
        .setAttribute('selected', 'selected');
    this.taskOutcomeIconField.selectedIndex = ICON_OPTION_NAMES.indexOf(
        this.options.taskOutcomeIcon || 'defaultTaskOutcomeIcon');

    if (!this.mapView.taskOutcomeMarkers.length) {
      this.taskOutcomeIconField.setAttribute('disabled', true);
    } else {
      this.taskOutcomeIconField.removeAttribute('disabled');
    }
  }
}

class DeliveryVehicleTrackingOptionsModal extends OptionsModal {
  /**
   * @param {string} id
   */
  constructor(id) {
    const urlQueryParams = getUrlQueryParams();
    super(urlQueryParams, id);
    this.options.deliveryVehicleId = urlQueryParams.deliveryVehicleId;
  }
}
