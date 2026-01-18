/**
 * 南光尺寸裁剪插件 - Web界面增强
 * 提供更好的用户体验和界面交互
 */

import { app } from "../../scripts/app.js";

// 扩展节点UI
app.registerExtension({
    name: "comfy.nanguang.size",
    
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        // 为南光节点添加中文标签和样式
        if (nodeData.name === "NanguangCrop") {
            const onNodeCreated = nodeType.prototype.onNodeCreated;
            
            nodeType.prototype.onNodeCreated = function() {
                const result = onNodeCreated?.apply(this, arguments);
                
                // 添加节点标题图标
                const titleElement = this.titleEl;
                if (titleElement) {
                    titleElement.innerHTML = "✂️ 南光图像裁剪";
                    titleElement.style.color = "#1890ff";
                    titleElement.style.fontWeight = "bold";
                    titleElement.style.fontFamily = "'Microsoft YaHei', 'SimHei', sans-serif";
                }
                
                // 增强小部件显示
                if (this.widgets) {
                    this.widgets.forEach(widget => {
                        // 为滑块添加单位
                        if (widget.name === "裁剪宽度" || widget.name === "裁剪高度") {
                            widget.label = widget.name + " (像素)";
                        }
                        
                        // 为裁剪类型添加图标
                        if (widget.name === "裁剪类型") {
                            widget.label = widget.name + " 🎯";
                        }
                        
                        // 为裁剪开关添加图标
                        if (widget.name === "裁剪开关") {
                            widget.label = widget.name + " ⚡";
                        }
                        
                        // 为偏移量添加图标
                        if (widget.name === "X偏移" || widget.name === "Y偏移") {
                            widget.label = widget.name + " 📍";
                        }
                    });
                }
                
                // 添加节点描述
                this.addWidget(
                    "text",
                    "节点说明",
                    "",
                    () => {},
                    {
                        multiline: true,
                        readonly: true
                    }
                );
                
                this.widgets[this.widgets.length - 1].value = 
                    "南光图像裁剪节点\n" +
                    "• 支持九种裁剪类型\n" +
                    "• 可精确控制裁剪尺寸\n" +
                    "• 支持位置偏移调整";
                
                return result;
            };
            
            // 增强节点执行后的显示
            const onExecuted = nodeType.prototype.onExecuted;
            
            nodeType.prototype.onExecuted = function(message) {
                const result = onExecuted?.apply(this, arguments);
                
                // 显示处理信息
                if (message && message.处理信息) {
                    // 创建信息显示区域
                    const infoDiv = document.createElement('div');
                    infoDiv.className = 'nanguang-info';
                    infoDiv.style.cssText = `
                        margin-top: 10px;
                        padding: 8px;
                        background: #f0f9ff;
                        border-radius: 4px;
                        border: 1px solid #91d5ff;
                        font-size: 11px;
                        line-height: 1.4;
                        max-height: 100px;
                        overflow-y: auto;
                        font-family: 'Microsoft YaHei', sans-serif;
                        color: #333;
                    `;
                    
                    // 解析处理信息
                    const lines = message.处理信息.split('\n');
                    lines.forEach(line => {
                        if (line.trim()) {
                            const lineDiv = document.createElement('div');
                            lineDiv.style.cssText = `
                                margin: 2px 0;
                                padding: 1px 0;
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            `;
                            lineDiv.textContent = line;
                            infoDiv.appendChild(lineDiv);
                        }
                    });
                    
                    // 添加到节点
                    if (!this.nanguangInfo) {
                        this.nanguangInfo = infoDiv;
                        this.addDOMWidget("nanguang_info", "处理信息", infoDiv);
                    } else {
                        this.nanguangInfo.innerHTML = infoDiv.innerHTML;
                    }
                }
                
                return result;
            };
        }
    },
    
    async setup() {
        console.log("🎯 南光尺寸插件 - Web界面已加载");
        
        // 添加自定义样式
        const style = document.createElement('style');
        style.textContent = `
            /* 南光尺寸节点样式 */
            .node[data-node-type="NanguangCrop"] {
                background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                border: 2px solid #1890ff;
                border-radius: 10px;
                min-width: 280px;
            }
            
            .node[data-node-type="NanguangCrop"] .title {
                background: linear-gradient(90deg, #1890ff 0%, #36cfc9 100%);
                color: white !important;
                font-weight: bold !important;
                font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
                font-size: 14px;
                padding: 8px 12px;
                border-radius: 8px 8px 0 0;
            }
            
            /* 小部件容器样式 */
            .node[data-node-type="NanguangCrop"] .content {
                padding: 10px;
            }
            
            /* 小部件样式 */
            .node[data-node-type="NanguangCrop"] .widget {
                margin: 8px 0;
                background: white;
                border-radius: 6px;
                padding: 6px;
                border: 1px solid #e8e8e8;
            }
            
            /* 下拉选择器样式 */
            .node[data-node-type="NanguangCrop"] select {
                font-family: 'Microsoft YaHei', sans-serif;
                padding: 6px 10px;
                border-radius: 4px;
                border: 1px solid #d9d9d9;
                background: white;
                width: 100%;
                font-size: 12px;
            }
            
            /* 滑块样式 */
            .node[data-node-type="NanguangCrop"] input[type="range"] {
                width: 100%;
                height: 6px;
                background: linear-gradient(90deg, #91d5ff 0%, #1890ff 100%);
                border-radius: 3px;
                outline: none;
                -webkit-appearance: none;
                margin: 5px 0;
            }
            
            .node[data-node-type="NanguangCrop"] input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 16px;
                height: 16px;
                background: #1890ff;
                border-radius: 50%;
                cursor: pointer;
                border: 2px solid white;
                box-shadow: 0 0 3px rgba(0,0,0,0.3);
            }
            
            /* 数字输入框样式 */
            .node[data-node-type="NanguangCrop"] input[type="number"] {
                font-family: 'Microsoft YaHei', sans-serif;
                padding: 6px 10px;
                border-radius: 4px;
                border: 1px solid #d9d9d9;
                background: white;
                width: 100%;
                font-size: 12px;
            }
            
            /* 标签样式 */
            .node[data-node-type="NanguangCrop"] .widget-label {
                font-family: 'Microsoft YaHei', sans-serif;
                font-weight: 500;
                color: #333;
                margin-bottom: 4px;
                display: block;
                font-size: 12px;
            }
            
            /* 输入输出点样式 */
            .node[data-node-type="NanguangCrop"] .input,
            .node[data-node-type="NanguangCrop"] .output {
                background: #1890ff;
                border: 2px solid white;
                box-shadow: 0 0 3px rgba(0,0,0,0.2);
            }
            
            .node[data-node-type="NanguangCrop"] .input:hover,
            .node[data-node-type="NanguangCrop"] .output:hover {
                background: #40a9ff;
                transform: scale(1.1);
                transition: all 0.2s ease;
            }
            
            /* 南光尺寸类别样式 */
            .comfy-menu-category[data-category="南光尺寸"] {
                background: linear-gradient(90deg, #1890ff 0%, #36cfc9 100%) !important;
                color: white !important;
                font-weight: bold !important;
                font-family: 'Microsoft YaHei', 'SimHei', sans-serif;
                border-radius: 6px;
                margin: 5px 0;
                padding: 8px 12px !important;
                font-size: 14px;
            }
            
            /* 文本小部件样式 */
            .node[data-node-type="NanguangCrop"] textarea {
                font-family: 'Microsoft YaHei', sans-serif;
                font-size: 11px;
                color: #666;
                background: #fafafa;
                border: 1px dashed #d9d9d9;
            }
            
            /* 处理信息区域 */
            .nanguang-info {
                font-family: 'Microsoft YaHei', sans-serif !important;
                font-size: 10px;
            }
        `;
        document.head.appendChild(style);
        
        // 为南光尺寸类别添加图标
        const observer = new MutationObserver(() => {
            const categoryElements = document.querySelectorAll('.comfy-menu-category');
            categoryElements.forEach(el => {
                if (el.textContent.includes('南光尺寸')) {
                    if (!el.querySelector('.nanguang-icon')) {
                        const icon = document.createElement('span');
                        icon.className = 'nanguang-icon';
                        icon.textContent = ' 📏';
                        icon.style.marginLeft = '5px';
                        el.appendChild(icon);
                    }
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
});