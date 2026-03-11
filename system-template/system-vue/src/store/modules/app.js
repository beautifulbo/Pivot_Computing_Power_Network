import { LANG, TAGS_VIEW } from "@/constant";
import { getItem, setItem } from "@/utils/storage";

export default {
  namespaced: true,
  state: () => ({
    // 菜单是否折叠
    isCollapse: false,
    // 标签页
    tagsViewList: getItem(TAGS_VIEW) || [
      {
        fullPath: "/dashboard",
        name: "Dashboard",
        path: "/dashboard",
        meta: {
          title: "首页",
          icon: "dashboard",
        },
        title: "首页",
      },
    ],
    // 缓存的组件名称列表 (必须与组件的 name 属性完全一致!)
    cachedViews: ["Dashboard"],
    // iframe 模块的显示状态 (组件名 -> showIframe 布尔值)
    moduleIframeStates: {},
  }),
  mutations: {
    // 折叠侧边栏
    setCollapse: (state) => {
      state.isCollapse = !state.isCollapse;
    },
    // 添加标签页
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path;
      });
      // 处理重复
      if (!isFind) {
        // 如果不存在重复的标签页
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
    // 添加缓存的组件
    addCachedView(state, viewName) {
      console.log("📦 [Store] 添加缓存组件:", viewName);
      console.log("  当前缓存列表:", state.cachedViews);

      if (state.cachedViews.includes(viewName)) {
        console.log("  ⏭️  组件已在缓存中,跳过");
        return;
      }

      state.cachedViews.push(viewName);
      console.log("  ✅ 添加成功,新的缓存列表:", state.cachedViews);
    },
    // 删除缓存的组件
    removeCachedView(state, viewName) {
      console.log("🗑️  [Store] 删除缓存组件:", viewName);
      const index = state.cachedViews.indexOf(viewName);
      if (index > -1) {
        state.cachedViews.splice(index, 1);
        console.log("  ✅ 删除成功,新的缓存列表:", state.cachedViews);
      } else {
        console.log("  ⚠️  组件不在缓存中");
      }
    },
    // 为指定的 tag 修改 title
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     * 关闭标签页
     *
     * @param { type: 'other' || 'right' || 'index' } payload 载荷
     */
    removeTagsView(state, payload) {
      // 关闭当前页
      if (payload.type === "index") {
        // 获取要删除的标签页的name，用于清除缓存
        const removedTag = state.tagsViewList[payload.index];
        if (removedTag && removedTag.name) {
          // 从缓存列表中移除
          const cacheIndex = state.cachedViews.indexOf(removedTag.name);
          if (cacheIndex > -1) {
            state.cachedViews.splice(cacheIndex, 1);
          }

          // 清除该模块的 iframe 状态，下次打开时重新加载
          if (state.moduleIframeStates[removedTag.name]) {
            console.log(`🗑️ [Store] 清除 ${removedTag.name} 的 iframe 状态（标签页已关闭）`);
            delete state.moduleIframeStates[removedTag.name];
            // 强制触发响应式更新
            state.moduleIframeStates = { ...state.moduleIframeStates };
          }
        }
        // 删除当前指定的一项标签页
        state.tagsViewList.splice(payload.index, 1);
      } else if (payload.type === "other") {
        // 保存当前标签页和首页的缓存
        const currentTag = state.tagsViewList[payload.index];
        const dashboardTag = state.tagsViewList[0];

        // 清除其他标签页的缓存
        state.cachedViews = ["Dashboard"];
        if (currentTag && currentTag.name && currentTag.name !== "Dashboard") {
          state.cachedViews.push(currentTag.name);
        }

        // 清除其他标签页的 iframe 状态
        const tagsToRemove = state.tagsViewList.filter((_, index) =>
          index !== 0 && index !== payload.index
        );
        tagsToRemove.forEach(tag => {
          if (tag && tag.name && state.moduleIframeStates[tag.name]) {
            console.log(`🗑️ [Store] 清除 ${tag.name} 的 iframe 状态（关闭其他标签页）`);
            delete state.moduleIframeStates[tag.name];
          }
        });
        state.moduleIframeStates = { ...state.moduleIframeStates };

        // 删除当前位置之后的标签页
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        );
        // 删除当前位置之前的标签页
        state.tagsViewList.splice(1, payload.index - 1);
      } else if (payload.type === "right") {
        // 获取要删除的标签页
        const removedTags = state.tagsViewList.slice(payload.index + 1);

        // 清除这些标签页的缓存和 iframe 状态
        removedTags.forEach(tag => {
          if (tag && tag.name) {
            const cacheIndex = state.cachedViews.indexOf(tag.name);
            if (cacheIndex > -1) {
              state.cachedViews.splice(cacheIndex, 1);
            }

            // 清除 iframe 状态
            if (state.moduleIframeStates[tag.name]) {
              console.log(`🗑️ [Store] 清除 ${tag.name} 的 iframe 状态（关闭右侧标签页）`);
              delete state.moduleIframeStates[tag.name];
            }
          }
        });
        state.moduleIframeStates = { ...state.moduleIframeStates };

        // 删除当前位置之后的标签页
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        );
      }
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    // 关闭全部标签页
    closeAllTagsView(state) {
      state.tagsViewList = [
        {
          fullPath: "/dashboard",
          name: "Dashboard",
          path: "/dashboard",
          meta: {
            title: "首页",
            icon: "dashboard",
          },
          title: "首页",
        },
      ];
      // 只保留首页的缓存
      state.cachedViews = ["Dashboard"];

      // 清除所有模块的 iframe 状态
      console.log("🗑️ [Store] 清除所有 iframe 状态（关闭全部标签页）");
      state.moduleIframeStates = {};

      // 更新存储的标签页
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    // 设置模块的 iframe 显示状态
    // 设置模块的 iframe 状态（支持 showIframe 和 iframeCreated）
    setModuleIframeState(state, { moduleName, showIframe, iframeCreated }) {
      console.log(`📺 [Store] 设置 ${moduleName} 的 iframe 状态:`, { showIframe, iframeCreated });

      // 获取当前模块的状态，如果不存在则初始化
      const currentState = state.moduleIframeStates[moduleName] || {
        showIframe: false,
        iframeCreated: false
      };

      console.log(`  📋 当前状态:`, currentState);

      // 只更新传入的属性（支持部分更新）
      const newState = {
        showIframe: showIframe !== undefined ? showIframe : currentState.showIframe,
        iframeCreated: iframeCreated !== undefined ? iframeCreated : currentState.iframeCreated
      };

      console.log(`  🔄 计算后的新状态:`, newState);

      // 使用对象展开确保响应式
      state.moduleIframeStates = {
        ...state.moduleIframeStates,
        [moduleName]: newState
      };

      console.log(`  ✅ 设置后的状态:`, state.moduleIframeStates[moduleName]);
      console.log(`  📊 所有模块状态:`, JSON.stringify(state.moduleIframeStates, null, 2));
    },
  },
};
