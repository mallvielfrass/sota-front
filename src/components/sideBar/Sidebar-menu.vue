<template>
  <div
    :style="cssVars"
    :class="{
      sidebar: true,
      open: isOpened,
      min: $isMobile(),
    }"
  >
    <div
      class="logo-details"
      :class="{
        'btn-list-on': !$isMobile(),
      }"
    >
      <img
        v-if="menuLogo"
        :src="menuLogo"
        alt="menu-logo"
        class="menu-logo icon"
      />
      <i v-else class="bx icon" :class="menuIcon" />
      <div class="logo_name">
        {{ menuTitle }}
      </div>
      <i
        class="bx"
        :class="isOpened ? 'bx-menu-alt-right' : 'bx-menu'"
        id="btn"
        @click="isOpened = !isOpened"
      />
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-grow: 1;
        max-height: calc(100% - 60px);
      "
    >
      <div
        id="my-scroll"
        :class="{
          'my-scroller': !$isMobile(),
          'my-scroller-mobile': $isMobile(),
        }"
      >
        <ul class="nav-list" style="overflow: visible">
          <!-- <li id="links_search" v-if="isSearch" @click="isOpened = true">
            <i class="bx bx-search" />
            <input
              type="text"
              :placeholder="searchPlaceholder"
              @input="$emit('search-input-emit', $event.target.value)"
            />
            <span data-target="links_search" class="tooltip">{{
              searchTooltip
            }}</span>
          </li> -->

          <li
            v-for="(menuItem, index) in menuItems"
            :key="index"
            :id="'links_' + index"
          >
            <a @click="navigate(menuItem.link)">
              <i class="bx" :class="menuItem.icon || 'bx-square-rounded'" />
              <span class="links_name">{{ menuItem.name }}</span>
            </a>
            <!-- <span :data-target="'links_' + index" class="tooltip">{{
              menuItem.tooltip || menuItem.name
            }}</span> -->
          </li>
        </ul>
      </div>

      <div v-if="isLoggedIn && isOpened" :class="{ profile: true }">
        <div class="profile-details">
          <img v-if="profileImg" :src="profileImg" alt="profileImg" />
          <i v-else class="bx bxs-user-rectangle" />
          <div class="name_job">
            <div class="name">
              {{ profileName }}
            </div>
            <div class="job">
              {{ profileRole }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//taken from the github.com/akahon/vue-sidebar-menu-akahon Copyright (c) 2021 Fayzullo Saidakbarov (akahon) and edited
import "./side.css";
export default {
  name: "SidebarMenu",
  props: {
    //! Menu settings
    isMenuOpen: {
      type: Boolean,
      default: true,
    },
    isUsedVueRouter: {
      type: Boolean,
      default: false,
    },
    menuTitle: {
      type: String,
      default: "Сота",
    },
    menuLogo: {
      type: String,
      default: "",
    },
    menuIcon: {
      type: String,
      default: "bxl-c-plus-plus",
    },
    isPaddingLeft: {
      type: Boolean,
      default: true,
    },
    menuOpenedPaddingLeftBody: {
      type: String,
      default: "250px",
    },
    menuClosedPaddingLeftBody: {
      type: String,
      default: "78px",
    },

    //! Menu items
    menuItems: {
      type: Array,
      default: () => [
        // {
        //   link: "#",
        //   name: "Dashboard",
        //   tooltip: "Dashboard",
        //   icon: "bx-grid-alt",
        // },
        {
          link: "/users",
          name: "Люди",
          tooltip: "",
          icon: "bx-user",
        },
        {
          link: "/messages",
          name: "Мои сообщения",
          tooltip: "",
          icon: "bx-chat",
        },
        // {
        //   link: "#",
        //   name: "Analytics",
        //   tooltip: "Analytics",
        //   icon: "bx-pie-chart-alt-2",
        // },
        // {
        //   link: "#",
        //   name: "File Manager",
        //   tooltip: "Files",
        //   icon: "bx-folder",
        // },
        // {
        //   link: "#",
        //   name: "Order",
        //   tooltip: "Order",
        //   icon: "bx-cart-alt",
        // },
        // {
        //   link: "#",
        //   name: "Saved",
        //   tooltip: "Saved",
        //   icon: "bx-heart",
        // },
        // {
        //   link: "#",
        //   name: "Setting",
        //   tooltip: "Setting",
        //   icon: "bx-cog",
        // },
      ],
    },

    //! Search
    isSearch: {
      type: Boolean,
      default: true,
    },
    searchPlaceholder: {
      type: String,
      default: "Search...",
    },
    searchTooltip: {
      type: String,
      default: "Search",
    },

    //! Profile detailes
    profileImg: {
      type: String,
      default: "",
    },
    profileName: {
      type: String,
      default: "Name Fullname",
    },
    profileRole: {
      type: String,
      default: " ",
    },
    isExitButton: {
      type: Boolean,
      default: true,
    },
    isLoggedIn: {
      type: Boolean,
      default: true,
    },

    //! Styles
    bgColor: {
      type: String,
      default: "#11101d",
    },
    secondaryColor: {
      type: String,
      default: "#1d1b31",
    },
    homeSectionColor: {
      type: String,
      default: "#e4e9f7",
    },
    logoTitleColor: {
      type: String,
      default: "#fff",
    },
    iconsColor: {
      type: String,
      default: "#fff",
    },
    itemsTooltipColor: {
      type: String,
      default: "#e4e9f7",
    },
    searchInputTextColor: {
      type: String,
      default: "#fff",
    },
    menuItemsHoverColor: {
      type: String,
      default: "#fff",
    },
    menuItemsTextColor: {
      type: String,
      default: "#fff",
    },
    menuFooterTextColor: {
      type: String,
      default: "#fff",
    },
  },
  data() {
    return {
      isOpened: false,
    };
  },
  mounted() {
    this.isOpened = this.isMenuOpen;
    this.tooltipAttached();
  },
  computed: {
    cssVars() {
      return {
        // '--padding-left-body': this.isOpened ? this.menuOpenedPaddingLeftBody : this.menuClosedPaddingLeftBody,
        "--bg-color": this.bgColor,
        "--secondary-color": this.secondaryColor,
        "--home-section-color": this.homeSectionColor,
        "--logo-title-color": this.logoTitleColor,
        "--icons-color": this.iconsColor,
        "--items-tooltip-color": this.itemsTooltipColor,
        "--serach-input-text-color": this.searchInputTextColor,
        "--menu-items-hover-color": this.menuItemsHoverColor,
        "--menu-items-text-color": this.menuItemsTextColor,
        "--menu-footer-text-color": this.menuFooterTextColor,
      };
    },
  },
  watch: {
    isOpened(val) {
      //   window.document.body.style.paddingLeft =
      //     this.isOpened && this.isPaddingLeft
      //       ? this.menuOpenedPaddingLeftBody
      //       : this.menuClosedPaddingLeftBody;
    },
  },
  methods: {
    navigate(path) {
      if (this.$isMobile) {
        this.isOpened = false;
      }
      this.$router.push(path);
    },
    tooltipAttached() {
      const tooltips = document.querySelectorAll(".tooltip");
      tooltips.forEach((tooltip) => {
        document.body.appendChild(tooltip);
      });
      document.querySelectorAll(".tooltip").forEach((tooltip) => {
        const targetID = tooltip.dataset.target;
        const target = document.querySelector(`#${targetID}`);
        if (!target) return;
        target.addEventListener("mouseenter", () => {
          const targetPosition = target.getBoundingClientRect();
          if (this.isOpened) return;
          tooltip.style.top = `${targetPosition.top + window.scrollY}px`;
          tooltip.style.left = `${
            targetPosition.left + targetPosition.width + 20
          }px`;
          tooltip.classList.add("active");
        });
        target.addEventListener("mouseleave", () => {
          tooltip.classList.remove("active");
        });
      });
    },
  },
};
</script>

<style></style>
