// 0. If using a module system (e.g. via vue-cli), import Vue and VueRouter
// and then call `Vue.use(VueRouter)`.

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    component: {
      template: `
        <div class="home text-center">
          <div class="home-title">
            <i class="fas fa-dog"></i>
            <p>
              Search for information on all of your favorite dog breeds
            </p>
          </div>
          <div class="icons">
            <router-link to="/terrier" class="icon">Terrier</router-link>
            <router-link to="/toy" class="icon">Toy</router-link>
            <router-link to="/working" class="icon">Working</router-link>
            <router-link to="/sporting" class="icon">Sporting</router-link>
            <router-link to="/hound" class="icon">Hound</router-link>
            <router-link to="/non-sporting" class="icon">Non-Sporting</router-link>
            <router-link to="/herding" class="icon">Herding</router-link>
          </div>
        </div>
        `,
        created: function() {
          console.log('created')
          document.getElementById('nav').classList.remove('active')
          document.getElementById('burger-nav').classList.remove('toggle')
        },
      }
    },
  {
    path: '/terrier',
    component: {
      template: `
        <div class="container breed">
          <h4 class="breed-type">The Terrier Group</h4>
          <hr class="underline" />
          <div class="dog">
          <img src="https://images.pexels.com/photos/1009405/pexels-photo-1009405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
          <p class="info">All but two of the terriers evolved in the British Isles. The geography of the specific area (water, rocky terrain) helped to determine the exact duties of each breed, but it usually involved hunting vermin and varmints ranging from rats to badgers to otters and more. These are dogs of great determination, courage, and self-confidence, with a great willingness to go to ground in search of its quarry.</p>
          </div>

          <i class="fas fa-paw"></i>
          <div v-for="dog in types" class="types">
            <div class="type">{{ dog }}</div>
          </div>
          <div class="controls">
            <router-link to="/toy"><i class="fas fa-arrow-circle-right right"></i></router-link>
          </div>
        </div>
      `,
      data: function(){
        return {
          types: ['American Staffordshire Terrier', 'Bull Terrier', 'Irish Terrier', 'Miniature Schnauzer', 'Russell Terrier', 'Scottish Terrier']
        }
      },
      created: function() {
        console.log('created')
        document.getElementById('nav').classList.remove('active')
        document.getElementById('burger-nav').classList.remove('toggle')
      },
    }
  },
  {
    path: '/toy',
    component: {
      template: `
        <div class="container breed">
          <h4 class="breed-type">The Toy Group</h4>
          <hr class="underline" />
          <div class="dog">
          <img src="https://images.pexels.com/photos/1591939/pexels-photo-1591939.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
          <p class="info">Toy dogs have been around for centuries, and are bred for one purpose: to be companions for their humans. Many have been bred down from and still resemble their larger cousins. Their small size and portability make them ideal for city dwellers and those with limited space.</p>
          </div>

          <i class="fas fa-paw"></i>
          <div v-for="dog in types">
            <div class="type">{{ dog }}</div>
          </div>
          <div class="controls">
            <router-link to="/terrier"><i class="fas fa-arrow-circle-left right"></i></router-link>
            <router-link to="/working"><i class="fas fa-arrow-circle-right right"></i></router-link>
          </div>
        </div>
        `,
        data: function(){
          return {
            types: ['Chihuahua', 'Italian Greyhound', 'Miniature Pinscher', 'Pomeranian', 'Pug', 'Shih Tzu']
          }
        },
        created: function() {
          console.log('created')
          document.getElementById('nav').classList.remove('active')
          document.getElementById('burger-nav').classList.remove('toggle')
        },
      }
    },
    {
      path: '/working',
      component: {
        template: `
          <div class="container breed">
            <h4 class="breed-type">The Working Group</h4>
            <hr class="underline" />
            <div class="dog">
            <img src="https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
            <p class="info">While the uses and appearances of the dogs in the Working Group vary, most are powerfully built and intelligent, performing various tasks for their people. These dogs are working farm and draft animals. They guard homes and livestock, serve heroically as police and military dogs, security dogs, guide and service dogs, and hunters.</p>
            </div>
            <i class="fas fa-paw"></i>

            <div v-for="dog in types">
              <div class="type">{{ dog }}</div>
            </div>
            <div class="controls">
              <router-link to="/toy"><i class="fas fa-arrow-circle-left right"></i></router-link>
              <router-link to="/sporting"><i class="fas fa-arrow-circle-right right"></i></router-link>
            </div>
          </div>
          `,
          data: function(){
            return {
              types: ['Alaskan Malamute', 'Bernese Mountain Dog', 'Boxer', 'Great Dane', 'Newfoundland', 'Saint Bernard']
            }
          },
          created: function() {
            console.log('created')
            document.getElementById('nav').classList.remove('active')
            document.getElementById('burger-nav').classList.remove('toggle')
          },
        }
      },
      {
        path: '/sporting',
        component: {
          template: `
            <div class="container breed">
              <h4 class="breed-type">The Sporting Group</h4>
              <hr class="underline" />
              <div class="dog">
                <img src="https://images.pexels.com/photos/1191000/pexels-photo-1191000.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
                <p class="info">The invention of the gun led to the development of the sporting, or gun dogs, to aid in hunting upland game birds or waterfowl, performing at the direction of the hunter. While a number of these breeds perform more than one task, it is generally the duty of pointers and setters to point and mark game, for spaniels to flush game, and for retrievers to recover dead and wounded game.</p>
              </div>

              <i class="fas fa-paw"></i>
              <div v-for="dog in types">
                <div class="type">{{ dog }}</div>
              </div>
              <div class="controls">
                <router-link to="/working"><i class="fas fa-arrow-circle-left right"></i></router-link>
                <router-link to="/hound"><i class="fas fa-arrow-circle-right right"></i></router-link>
              </div>
            </div>
            `,
            data: function(){
              return {
                types: ['Cocker Spaniel', 'English Setter', 'German Shorthaired Pointer', 'Golden Retriever', 'Labrador Retriever', 'Weimeraner']
              }
            },
            created: function() {
              console.log('created')
              document.getElementById('nav').classList.remove('active')
              document.getElementById('burger-nav').classList.remove('toggle')
            },
          }
        },
        {
          path: '/hound',
          component: {
            template: `
              <div class="container breed">
                <h4 class="breed-type">The Hound Group</h4>
                <hr class="underline" />
                <div class="dog">
                <img src="https://images.pexels.com/photos/1581628/pexels-photo-1581628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
                <p class="info">Originally classified as sporting dogs because of their function as hunters, breeds in the Hound Group are of a great variety of size, shape, and coat. Most of these breeds were developed to hunt somewhat independently for their humans, who usually followed on foot or on horseback as the hounds chased down the prey. This group informally consists of scent hounds; dogs that hunt by tracking a scent, and sight hounds; who spot their game and run it down.</p>
                </div>

                <i class="fas fa-paw"></i>
                <div v-for="dog in types">
                  <div class="type">{{ dog }}</div>
                </div>
                <div class="controls">
                  <router-link to="/sporting"><i class="fas fa-arrow-circle-left right"></i></router-link>
                  <router-link to="/non-sporting"><i class="fas fa-arrow-circle-right right"></i></router-link>
                </div>
              </div>
              `,
              data: function(){
                return {
                  types: ['American Foxhound', 'Basenji', 'Bloodhound', 'Dachshund', 'Irish Wolfhound', 'Rhodesian Ridgeback']
                }
              },
              created: function() {
                console.log('created')
                document.getElementById('nav').classList.remove('active')
                document.getElementById('burger-nav').classList.remove('toggle')
              },
            }
          },
          {
            path: '/non-sporting',
            component: {
              template: `
                <div class="container breed">
                  <h4 class="breed-type">The Non-Sporting Group</h4>
                  <hr class="underline" />
                  <div class="dog">
                    <img src="https://images.pexels.com/photos/160748/bulldog-dog-pet-breed-160748.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
                    <p class="info">The AKC originally registered dogs as either Sporting or Non-Sporting. Eventually, hounds and terriers were split from the Sporting Group, and the Toys and Working dogs were split off from Non-Sporting, with the Herding Group eventually splitting from Working. Today, the Non-Sporting Group is literally every breed that is left, resulting in a wide variety of sizes, shapes, hair, function, and history.</p>
                  </div>

                  <i class="fas fa-paw"></i>
                  <div v-for="dog in types">
                    <div class="type">{{ dog }}</div>
                  </div>
                  <div class="controls">
                    <router-link to="/hound"><i class="fas fa-arrow-circle-left right"></i></router-link>
                    <router-link to="/herding"><i class="fas fa-arrow-circle-right right"></i></router-link>
                  </div>
                </div>
                `,
                data: function(){
                  return {
                    types: ['Bulldog', 'Chow Chow', 'Dalmation', 'Lhasa Apso', 'Shiba Inu', 'Tibetan Terrier' ]
                  }
                },
                created: function() {
                  console.log('created')
                  document.getElementById('nav').classList.remove('active')
                  document.getElementById('burger-nav').classList.remove('toggle')
                },
              }
            },
            {
              path: '/herding',
              component: {
                template: `
                  <div class="container breed">
                    <h4 class="breed-type">The Herding Group</h4>
                    <hr class="underline" />
                    <div class="dog">
                      <img src="https://images.pexels.com/photos/533118/pexels-photo-533118.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" width="100%" height="auto" />
                      <p class="info">Herding is a natural instinct in dogs that are seen in the wild. Humans have used that instinct to their advantage on farms and ranches with herding dogs who have the sole purpose of gathering and moving livestock from one place to another.</p>
                    </div>

                    <i class="fas fa-paw"></i>
                    <div v-for="dog in types">
                      <div class="type">{{ dog }}</div>
                    </div>
                    <div class="controls">
                      <router-link to="/non-sporting"><i class="fas fa-arrow-circle-left right"></i></router-link>
                    </div>
                  </div>
                  `,
                  data: function(){
                    return {
                      types: ['Australian Cattle Dog', 'Belgian Sheepdog', 'Border Collie', 'Cardigan Welsh Corgie', 'German Shepherd', 'Old English Sheepdog']
                    }
                  },
                  created: function() {
                    console.log('created')
                    document.getElementById('nav').classList.remove('active')
                    document.getElementById('burger-nav').classList.remove('toggle')
                  },
                }
              },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  routes // short for `routes: routes`
})

// 4. Create and mount the root instance.
// Make sure to inject the router with the router option to make the
// whole app router-aware.
const app = new Vue({
  el: '#app',
  data: {},
  methods: {
    toggleNav: function() {
      document.getElementById('nav').classList.toggle('active')
      document.getElementById('burger-nav').classList.toggle('toggle')
    },
  },
  router
}).$mount('#app')

// Now the app has started!
