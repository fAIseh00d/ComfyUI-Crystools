import { app, api } from './comfy/index.js';
import { commonPrefix } from './common.js';
import { MonitorUI } from './monitorUI.js';
import { Colors } from './styles.js';
import { convertNumberToPascalCase } from './utils.js';
import { NewMenuOptions } from './progressBarUIBase.js';
class CrystoolsMonitor {
    constructor() {
        Object.defineProperty(this, "idExtensionName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Crystools.monitor'
        });
        Object.defineProperty(this, "menuPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: commonPrefix
        });
        Object.defineProperty(this, "newMenu", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: NewMenuOptions.Disabled
        });
        Object.defineProperty(this, "settingsRate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "settingsMonitorHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "settingsMonitorWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "monitorCPUElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "monitorRAMElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "monitorHDDElement", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "settingsHDD", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "monitorGPUSettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "monitorVRAMSettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "monitorTemperatureSettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "monitorUI", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "monitorWidthId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Crystools.MonitorWidth'
        });
        Object.defineProperty(this, "monitorWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 60
        });
        Object.defineProperty(this, "monitorHeightId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'Crystools.MonitorHeight'
        });
        Object.defineProperty(this, "monitorHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 30
        });
        Object.defineProperty(this, "createSettingsRate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.settingsRate = {
                    id: 'Crystools.RefreshRate',
                    name: 'Refresh per second',
                    category: ['Crystools', this.menuPrefix + ' Configuration', 'refresh'],
                    tooltip: 'This is the time (in seconds) between each update of the monitors, 0 means no refresh',
                    type: 'slider',
                    attrs: {
                        min: 0,
                        max: 2,
                        step: .25,
                    },
                    defaultValue: .5,
                    onChange: async (value) => {
                        let valueNumber;
                        try {
                            valueNumber = parseFloat(value);
                            if (isNaN(valueNumber)) {
                                throw new Error('invalid value');
                            }
                        }
                        catch (error) {
                            console.error(error);
                            return;
                        }
                        try {
                            await this.updateServer({ rate: valueNumber });
                        }
                        catch (error) {
                            console.error(error);
                            return;
                        }
                        const data = {
                            cpu_utilization: 0,
                            device: 'cpu',
                            gpus: [
                                {
                                    gpu_utilization: 0,
                                    gpu_temperature: 0,
                                    vram_total: 0,
                                    vram_used: 0,
                                    vram_used_percent: 0,
                                },
                            ],
                            hdd_total: 0,
                            hdd_used: 0,
                            hdd_used_percent: 0,
                            ram_total: 0,
                            ram_used: 0,
                            ram_used_percent: 0,
                        };
                        if (valueNumber === 0) {
                            this.monitorUI.updateDisplay(data);
                        }
                        this.monitorUI?.updateAllAnimationDuration(valueNumber);
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettingsCPU", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.monitorCPUElement = {
                    id: 'Crystools.ShowCpu',
                    name: 'CPU Usage',
                    category: ['Crystools', this.menuPrefix + ' Hardware', 'Cpu'],
                    type: 'boolean',
                    label: 'CPU',
                    symbol: '%',
                    defaultValue: true,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.CPU,
                    onChange: async (value) => {
                        this.updateWidget(this.monitorCPUElement);
                        await this.updateServer({ switchCPU: value });
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettingsRAM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.monitorRAMElement = {
                    id: 'Crystools.ShowRam',
                    name: 'RAM Used',
                    category: ['Crystools', this.menuPrefix + ' Hardware', 'Ram'],
                    type: 'boolean',
                    label: 'RAM',
                    symbol: '%',
                    defaultValue: true,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.RAM,
                    onChange: async (value) => {
                        this.updateWidget(this.monitorRAMElement);
                        await this.updateServer({ switchRAM: value });
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettingsGPUUsage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, index, moreThanOneGPU) => {
                if (name === undefined || index === undefined) {
                    console.warn('getGPUsFromServer: name or index undefined', name, index);
                    return;
                }
                let label = 'GPU ';
                label += moreThanOneGPU ? index : '';
                const monitorGPUNElement = {
                    id: 'Crystools.ShowGpuUsage' + convertNumberToPascalCase(index),
                    name: ' Usage',
                    category: ['Crystools', `${this.menuPrefix} Show GPU [${index}] ${name}`, 'Usage'],
                    type: 'boolean',
                    label,
                    symbol: '%',
                    monitorTitle: `${index}: ${name}`,
                    defaultValue: true,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.GPU,
                    onChange: async (value) => {
                        this.updateWidget(monitorGPUNElement);
                        void await this.updateServerGPU(index, { utilization: value });
                    },
                };
                this.monitorGPUSettings[index] = monitorGPUNElement;
                app.ui.settings.addSetting(this.monitorGPUSettings[index]);
                this.monitorUI.createDOMGPUMonitor(this.monitorGPUSettings[index]);
            }
        });
        Object.defineProperty(this, "createSettingsGPUVRAM", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, index, moreThanOneGPU) => {
                if (name === undefined || index === undefined) {
                    console.warn('getGPUsFromServer: name or index undefined', name, index);
                    return;
                }
                let label = 'VRAM ';
                label += moreThanOneGPU ? index : '';
                const monitorVRAMNElement = {
                    id: 'Crystools.ShowGpuVram' + convertNumberToPascalCase(index),
                    name: 'VRAM',
                    category: ['Crystools', `${this.menuPrefix} Show GPU [${index}] ${name}`, 'VRAM'],
                    type: 'boolean',
                    label: label,
                    symbol: '%',
                    monitorTitle: `${index}: ${name}`,
                    defaultValue: true,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.VRAM,
                    onChange: async (value) => {
                        this.updateWidget(monitorVRAMNElement);
                        void await this.updateServerGPU(index, { vram: value });
                    },
                };
                this.monitorVRAMSettings[index] = monitorVRAMNElement;
                app.ui.settings.addSetting(this.monitorVRAMSettings[index]);
                this.monitorUI.createDOMGPUMonitor(this.monitorVRAMSettings[index]);
            }
        });
        Object.defineProperty(this, "createSettingsGPUTemp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (name, index, moreThanOneGPU) => {
                if (name === undefined || index === undefined) {
                    console.warn('getGPUsFromServer: name or index undefined', name, index);
                    return;
                }
                let label = 'Temp ';
                label += moreThanOneGPU ? index : '';
                const monitorTemperatureNElement = {
                    id: 'Crystools.ShowGpuTemperature' + convertNumberToPascalCase(index),
                    name: 'Temperature',
                    category: ['Crystools', `${this.menuPrefix} Show GPU [${index}] ${name}`, 'Temperature'],
                    type: 'boolean',
                    label: label,
                    symbol: '°',
                    monitorTitle: `${index}: ${name}`,
                    defaultValue: true,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.TEMP_START,
                    cssColorFinal: Colors.TEMP_END,
                    onChange: async (value) => {
                        this.updateWidget(monitorTemperatureNElement);
                        void await this.updateServerGPU(index, { temperature: value });
                    },
                };
                this.monitorTemperatureSettings[index] = monitorTemperatureNElement;
                app.ui.settings.addSetting(this.monitorTemperatureSettings[index]);
                this.monitorUI.createDOMGPUMonitor(this.monitorTemperatureSettings[index]);
            }
        });
        Object.defineProperty(this, "createSettingsHDD", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.monitorHDDElement = {
                    id: 'Crystools.ShowHdd',
                    name: 'Show HDD Used',
                    category: ['Crystools', this.menuPrefix + ' Show Hard Disk', 'Show'],
                    type: 'boolean',
                    label: 'HDD',
                    symbol: '%',
                    defaultValue: false,
                    htmlMonitorRef: undefined,
                    htmlMonitorSliderRef: undefined,
                    htmlMonitorLabelRef: undefined,
                    cssColor: Colors.DISK,
                    onChange: async (value) => {
                        this.updateWidget(this.monitorHDDElement);
                        await this.updateServer({ switchHDD: value });
                    },
                };
                this.settingsHDD = {
                    id: 'Crystools.WhichHdd',
                    name: 'Partition to show',
                    category: ['Crystools', this.menuPrefix + ' Show Hard Disk', 'Which'],
                    type: 'combo',
                    defaultValue: '/',
                    data: [],
                    options: (value) => {
                        const which = app.ui.settings.getSettingValue(this.settingsHDD.id, this.settingsHDD.defaultValue);
                        return this.settingsHDD.data.map((m) => ({
                            value: m,
                            text: m,
                            selected: !value ? m === which : m === value,
                        }));
                    },
                    onChange: async (value) => {
                        await this.updateServer({ whichHDD: value });
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettingsMonitorWidth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.settingsMonitorWidth = {
                    id: this.monitorWidthId,
                    name: 'Pixel Width',
                    category: ['Crystools', this.menuPrefix + ' Configuration', 'width'],
                    tooltip: 'The width of the monitor in pixels on the UI (only on horizontal UI)',
                    type: 'slider',
                    attrs: {
                        min: 60,
                        max: 100,
                        step: 1,
                    },
                    defaultValue: this.monitorWidth,
                    onChange: (value) => {
                        let valueNumber;
                        try {
                            valueNumber = parseInt(value);
                            if (isNaN(valueNumber)) {
                                throw new Error('invalid value');
                            }
                        }
                        catch (error) {
                            console.error(error);
                            return;
                        }
                        const h = app.ui.settings.getSettingValue(this.monitorHeightId, this.monitorHeight);
                        this.monitorUI?.updateMonitorSize(valueNumber, h);
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettingsMonitorHeight", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.settingsMonitorHeight = {
                    id: this.monitorHeightId,
                    name: 'Pixel Height',
                    category: ['Crystools', this.menuPrefix + ' Configuration', 'height'],
                    tooltip: 'The height of the monitor in pixels on the UI (only on horizontal UI)',
                    type: 'slider',
                    attrs: {
                        min: 16,
                        max: 50,
                        step: 1,
                    },
                    defaultValue: this.monitorHeight,
                    onChange: (value) => {
                        let valueNumber;
                        try {
                            valueNumber = parseInt(value);
                            if (isNaN(valueNumber)) {
                                throw new Error('invalid value');
                            }
                        }
                        catch (error) {
                            console.error(error);
                            return;
                        }
                        const w = app.ui.settings.getSettingValue(this.monitorWidthId, this.monitorWidth);
                        this.monitorUI?.updateMonitorSize(w, valueNumber);
                    },
                };
            }
        });
        Object.defineProperty(this, "createSettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                app.ui.settings.addSetting(this.settingsRate);
                app.ui.settings.addSetting(this.settingsMonitorHeight);
                app.ui.settings.addSetting(this.settingsMonitorWidth);
                app.ui.settings.addSetting(this.monitorRAMElement);
                app.ui.settings.addSetting(this.monitorCPUElement);
                void this.getHDDsFromServer().then((data) => {
                    this.settingsHDD.data = data;
                    app.ui.settings.addSetting(this.settingsHDD);
                });
                app.ui.settings.addSetting(this.monitorHDDElement);
                void this.getGPUsFromServer().then((gpus) => {
                    let moreThanOneGPU = false;
                    if (gpus.length > 1) {
                        moreThanOneGPU = true;
                    }
                    gpus?.forEach(({ name, index }) => {
                        this.createSettingsGPUTemp(name, index, moreThanOneGPU);
                        this.createSettingsGPUVRAM(name, index, moreThanOneGPU);
                        this.createSettingsGPUUsage(name, index, moreThanOneGPU);
                    });
                    this.finishedLoad();
                });
            }
        });
        Object.defineProperty(this, "finishedLoad", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.monitorUI.orderMonitors();
                this.updateAllWidget();
                this.moveMonitor(this.newMenu);
                const w = app.ui.settings.getSettingValue(this.monitorWidthId, this.monitorWidth);
                const h = app.ui.settings.getSettingValue(this.monitorHeightId, this.monitorHeight);
                this.monitorUI.updateMonitorSize(w, h);
            }
        });
        Object.defineProperty(this, "updateDisplay", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                setTimeout(() => {
                    const newMenu = app.ui.settings.getSettingValue('Comfy.UseNewMenu', 'Disabled');
                    if (newMenu !== this.newMenu) {
                        this.newMenu = newMenu;
                        this.moveMonitor(this.newMenu);
                    }
                });
            }
        });
        Object.defineProperty(this, "moveMonitor", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (position) => {
                let parentElement;
                switch (position) {
                    case NewMenuOptions.Disabled:
                        parentElement = document.getElementById('queue-button');
                        if (parentElement && this.monitorUI.htmlRoot) {
                            parentElement.insertAdjacentElement('afterend', this.monitorUI.htmlRoot);
                        }
                        else {
                            console.error('Crystools: parentElement to move monitors not found!', parentElement);
                        }
                        break;
                    case NewMenuOptions.Top:
                    case NewMenuOptions.Bottom:
                        this.monitorUI.htmlRoot?.classList.add('comfyui-button-group');
                        parentElement = document.getElementsByClassName('comfyui-menu-push')[0];
                        if (parentElement && this.monitorUI.htmlRoot) {
                            parentElement.insertAdjacentElement('afterend', this.monitorUI.htmlRoot);
                        }
                        else {
                            console.error('Crystools: parentElement to move monitors not found!', parentElement);
                        }
                        break;
                }
            }
        });
        Object.defineProperty(this, "updateAllWidget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.updateWidget(this.monitorCPUElement);
                this.updateWidget(this.monitorRAMElement);
                this.updateWidget(this.monitorHDDElement);
                this.monitorGPUSettings.forEach((monitorSettings) => {
                    monitorSettings && this.updateWidget(monitorSettings);
                });
                this.monitorVRAMSettings.forEach((monitorSettings) => {
                    monitorSettings && this.updateWidget(monitorSettings);
                });
                this.monitorTemperatureSettings.forEach((monitorSettings) => {
                    monitorSettings && this.updateWidget(monitorSettings);
                });
            }
        });
        Object.defineProperty(this, "updateWidget", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (monitorSettings) => {
                if (this.monitorUI) {
                    const value = app.ui.settings.getSettingValue(monitorSettings.id, monitorSettings.defaultValue);
                    this.monitorUI.showMonitor(monitorSettings, value);
                }
            }
        });
        Object.defineProperty(this, "updateServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (data) => {
                const resp = await api.fetchApi('/crystools/monitor', {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    cache: 'no-store',
                });
                if (resp.status === 200) {
                    return await resp.text();
                }
                throw new Error(resp.statusText);
            }
        });
        Object.defineProperty(this, "updateServerGPU", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (index, data) => {
                const resp = await api.fetchApi(`/crystools/monitor/GPU/${index}`, {
                    method: 'PATCH',
                    body: JSON.stringify(data),
                    cache: 'no-store',
                });
                if (resp.status === 200) {
                    return await resp.text();
                }
                throw new Error(resp.statusText);
            }
        });
        Object.defineProperty(this, "getHDDsFromServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                return this.getDataFromServer('HDD');
            }
        });
        Object.defineProperty(this, "getGPUsFromServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                return this.getDataFromServer('GPU');
            }
        });
        Object.defineProperty(this, "getDataFromServer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (what) => {
                const resp = await api.fetchApi(`/crystools/monitor/${what}`, {
                    method: 'GET',
                    cache: 'no-store',
                });
                if (resp.status === 200) {
                    return await resp.json();
                }
                throw new Error(resp.statusText);
            }
        });
        Object.defineProperty(this, "setup", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (this.monitorUI) {
                    return;
                }
                this.createSettingsRate();
                this.createSettingsMonitorHeight();
                this.createSettingsMonitorWidth();
                this.createSettingsCPU();
                this.createSettingsRAM();
                this.createSettingsHDD();
                this.createSettings();
                const currentRate = parseFloat(app.ui.settings.getSettingValue(this.settingsRate.id, this.settingsRate.defaultValue));
                this.newMenu = app.ui.settings.getSettingValue('Comfy.UseNewMenu', 'Disabled');
                this.monitorUI = new MonitorUI(this.monitorCPUElement, this.monitorRAMElement, this.monitorHDDElement, this.monitorGPUSettings, this.monitorVRAMSettings, this.monitorTemperatureSettings, currentRate);
                this.updateDisplay();
                this.registerListeners();
            }
        });
        Object.defineProperty(this, "registerListeners", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                api.addEventListener('crystools.monitor', (event) => {
                    if (event?.detail === undefined) {
                        return;
                    }
                    this.monitorUI.updateDisplay(event.detail);
                }, false);
            }
        });
        window.addEventListener('resize', this.updateDisplay);
    }
}
const crystoolsMonitor = new CrystoolsMonitor();
app.registerExtension({
    name: crystoolsMonitor.idExtensionName,
    setup: crystoolsMonitor.setup,
});
