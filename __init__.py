"""
南光尺寸裁剪插件 - ComfyUI中文图像处理插件
版本: 1.0.0
作者: 南光工具
描述: 提供专业的图像尺寸裁剪功能，支持九种裁剪类型
"""

import os
import sys

# 添加当前目录到Python路径
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))

# 导入节点模块
try:
    from .nanguang_crop_node import (
        NODE_CLASS_MAPPINGS,
        NODE_DISPLAY_NAME_MAPPINGS,
        WEB_DIRECTORY
    )
    
    print("\n" + "="*50)
    print("🎯 南光尺寸裁剪插件 v1.0.0 已加载")
    print("="*50)
    print("📁 节点类别: 南光尺寸")
    print("🛠️  可用节点: 南光图像裁剪")
    print("="*50)
    
except ImportError as e:
    print(f"\n❌ 南光尺寸插件加载失败: {str(e)}")
    print("请检查文件完整性")
    NODE_CLASS_MAPPINGS = {}
    NODE_DISPLAY_NAME_MAPPINGS = {}

# Web扩展目录
WEB_DIRECTORY = "./web"

# 插件元数据
__version__ = "1.0.0"
__author__ = "南光工具"
__description__ = "专业的图像尺寸裁剪工具，支持九种裁剪类型"

# 导出
__all__ = [
    'NODE_CLASS_MAPPINGS',
    'NODE_DISPLAY_NAME_MAPPINGS', 
    'WEB_DIRECTORY'
]