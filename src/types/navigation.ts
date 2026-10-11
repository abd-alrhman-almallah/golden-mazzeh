export interface SidebarNavItem {
  label: string;
  to: string;
  /** Match the route exactly (used for the root item) */
  end?: boolean;
}