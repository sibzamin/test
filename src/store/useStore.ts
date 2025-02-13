import { create } from 'zustand';
    import { persist } from 'zustand/middleware';
    import { db } from '../db/db';
    import { rules } from '../db/schema';
    import { eq } from 'drizzle-orm';
    
    interface Rule {
      id: string;
      content: string;
    }
    
    interface AdminState {
      isAuthenticated: boolean;
      mainRules: Rule[];
      jobRules: Rule[];
      robberyRules: Rule[];
      gangRules: Rule[];
      login: (username: string, password1: string, password2: string, password3: string) => boolean;
      logout: () => void;
      fetchRules: () => Promise<void>;
      updateRules: (type: 'main' | 'job' | 'robbery' | 'gang', rulesData: Rule[]) => Promise<void>;
    }
    
    const useStore = create<AdminState>()(
      persist(
        (set, get) => ({
          isAuthenticated: false,
          mainRules: [],
          jobRules: [],
          robberyRules: [],
          gangRules: [],
          login: (username, password1, password2, password3) => {
            if (
              username === 'minerbomb' &&
              password1 === 'RAnDoMShiT!@' &&
              password2 === 'KqS&WkUqwPkQd*E%wf' &&
              password3 === 'Zk^#o%dvKA^vpYXK'
            ) {
              set({ isAuthenticated: true });
              return true;
            }
            return false;
          },
          logout: () => set({ isAuthenticated: false }),
          fetchRules: async () => {
            try {
              const mainRules = await db.select().from(rules).where(eq(rules.type, 'main'));
              const jobRules = await db.select().from(rules).where(eq(rules.type, 'job'));
              const robberyRules = await db.select().from(rules).where(eq(rules.type, 'robbery'));
              const gangRules = await db.select().from(rules).where(eq(rules.type, 'gang'));
    
              set({
                mainRules: mainRules.length > 0 ? mainRules : [{ id: '1', content: 'قوانین اصلی سرور که از طریق پنل ادمین قابل ویرایش است.' }],
                jobRules: jobRules.length > 0 ? jobRules : [{ id: '1', content: 'قوانین شغل‌ها که از طریق پنل ادمین قابل ویرایش است.' }],
                robberyRules: robberyRules.length > 0 ? robberyRules : [{ id: '1', content: 'قوانین رابری که از طریق پنل ادمین قابل ویرایش است.' }],
                gangRules: gangRules.length > 0 ? gangRules : [{ id: '1', content: 'قوانین گنگ‌ها که از طریق پنل ادمین قابل ویرایش است.' }],
              });
            } catch (error) {
              console.error("Database fetch error:", error);
            }
          },
          updateRules: async (type, rulesData) => {
            try {
              if (rulesData && rulesData.length > 0) {
                await db.insert(rules)
                  .values({ id: rulesData[0].id, type: type, content: rulesData[0].content })
                  .onDuplicateKeyUpdate({
                    set: {
                      content: rulesData[0].content,
                    },
                  });
    
                // Optimistically update the state
                set((state) => {
                  switch (type) {
                    case 'main':
                      return { ...state, mainRules: rulesData };
                    case 'job':
                      return { ...state, jobRules: rulesData };
                    case 'robbery':
                      return { ...state, robberyRules: rulesData };
                    case 'gang':
                      return { ...state, gangRules: rulesData };
                    default:
                      return state;
                  }
                });
              }
            } catch (error) {
              console.error("Database update error:", error);
            }
          },
        }),
        {
          name: 'admin-storage',
          onRehydrateStorage: () => {
            return (state, error) => {
              if (!state) return;
              state.fetchRules();
            };
          },
        }
      )
    );
    
    export default useStore;
