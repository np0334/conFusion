'use strict';

 angular.module('confusionApp')

.controller('MenuController', ['$scope', 'menuFactory' , function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;

            $scope.dishes=[
                         {
                          name:'Uthapizza',
                          image: 'images/uthapizza.png',
                          category: 'mains', 
                          label:'Hot',
                          price:'4.99',
                          description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
                           comment: ''
                        },
                        {
                          name:'Zucchipakoda', 
                          image: 'images/zucchipakoda.png',
                          category: 'appetizer', 
                          label:'',
                          price:'1.99',
                          description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
                           comment: ''
                        },
                        {
                          name:'Vadonut', 
                          image: 'images/vadonut.png',
                          category: 'appetizer', 
                          label:'New',
                          price:'1.99',
                          description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
                           comment: ''
                        },
                        {
                          name:'ElaiCheese Cake', 
                          image: 'images/elaicheesecake.png',
                          category: 'dessert', 
                          label:'',
                          price:'2.99',
                          description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
                           comment: ''
                        }
                        ];
            $scope.dishes = menuFactory.getDishes();
                        
            $scope.select = function(setTab) {
                $scope.tab = setTab;
                
                if (setTab === 2) {
                    $scope.filtText = "appetizer";
                }
                else if (setTab === 3) {
                    $scope.filtText = "mains";
                }
                else if (setTab === 4) {
                    $scope.filtText = "dessert";
                }
                else {
                    $scope.filtText = "";
                }
            };

            $scope.isSelected = function (checkTab) {
                return ($scope.tab === checkTab);
            };
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])

        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])

        .controller('FeedbackController', ['$scope', function($scope) {
            
            $scope.sendFeedback = function() {
                
                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }
                else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";
                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };
        }])

        .controller('DishDetailController', ['$scope', '$routeParams', 'menuFactory' , function($scope, $routeParams, menuFactory) {
            
            var dish= menuFactory.getDish(parseInt($routeParams.id,10));
            $scope.dish = dish;
            
        }])

        .controller('DishCommentController', ['$scope', function($scope) {

            $scope.formComment={rating:"",comment:"",author:"",date:""};

            $scope.formComment.rating= 5;
            //Step 1: Create a JavaScript object to hold the comment from the form
            

            $scope.submitComment = function () {

                
                $scope.formComment.comment= $scope.formComment.textarea;
                $scope.formComment.author= $scope.formComment.yourName;
                //Step 2: This is how you record the date
                $scope.formComment.date = new Date().toISOString();
              
                // Step 3: Push your comment into the dish's comment array
                $scope.dish.comments.push($scope.formComment);
                
                //Step 4: reset your form to pristine
                $scope.commentForm.$setPristine();
                //Step 5: reset your JavaScript object that holds your comment
                $scope.formComment = {rating:5 ,comment:"",author:"",date:""};
            };
        }])
;