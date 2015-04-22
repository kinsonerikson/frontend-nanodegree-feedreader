/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
		
		/* This test loops through all of the feeds and makes sure they 
		 * all have a url variable and the url variable has content.
		 */
		it('have a defined/filled url', function() {
			for(var i=0;i<allFeeds.length;i++){
				expect(allFeeds[i].url).toBeDefined();
				expect(allFeeds[i].url).not.toBe('');				
			}
		});
		
		/* This test loops through all of the feeds and makes sure they 
		 * all have a name variable and the name variable has content.
		 */ 
		it('have a defined/filled name', function() {
			for(var i=0;i<allFeeds.length;i++){
				expect(allFeeds[i].name).toBeDefined();
				expect(allFeeds[i].name).not.toBe('');				
			}
		});
    });
	
	// This suite is for testing the functionality of the menu 	
	describe('The menu', function() {
		
		// This tests makes sure that the menu is hidden by default when the page first loads.
		it('should have the menu hidden by default', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);	
		});	
		
		/* This test makes sure that when you first click the menu button the menu is shown.
		 * A second press should hide the menu
		 */
		it('should open/close the menu when the menu button is clicked', function() {
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			$('.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
	});        
	
	// This suite tests the initial setup of the feed list
	describe('Initial Entries', function() {
		/* Since this is an Async request, we need to do it a little differently.
		 * You have to do a beforeEach and pass it a done function.
		 * This way jasmine will wait for the function to complete before running
		 * the test.
		 */
		beforeEach(function(done){
			loadFeed(0,done);
		});
		
		/* After the test runs we need to verify there is at least
		 * one .entry in the .feed container
		 */
		it('should have at least one entry', function(done) {			
			expect($('.feed .entry').length > 0).toBe(true);
			done();
		});
	});
	
	// This suite tests that when a new feed is picked, the container updates
	describe('New Feed Selection', function() {
		/* Since this is an Async request, we need to do it a little differently.
		 * You have to do a beforeEach and pass it a done function.
		 * This way jasmine will wait for the function to complete before running
		 * the test. Also we need to set the initial content of the .feed container
		 * into a variable for later comparison.
		 */
		var firstContent = $('.feed').html();
		var secondContent = "";		
		beforeEach(function(done){
			loadFeed(1,function(){
				secondContent = $('.feed').html();
				done();
			});			
		});	
		
		/* After the test runs we need to verify the content of the .feed box
		 * has been changed to the new content.
		 */
		it('should change the content when a new feed is picked', function(done) {			
			expect(firstContent !== secondContent).toBe(true);
			done();
		});
	});
}());
