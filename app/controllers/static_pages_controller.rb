class StaticPagesController < ApplicationController

  def home
    @klavinslab = "http://klavinslab.org/"
    @uw = "http://www.washington.edu/"
    @uwee = "http://www.ee.washington.edu/"
    @sjtu = "http://en.sjtu.edu.cn/"
    @auto_sjtu = "http://www.automation.sjtu.edu.cn/en/"
    @control_theory = "http://en.wikipedia.org/wiki/Control_theory"
    @automation_wiki = "http://en.wikipedia.org/wiki/Automation"
    @syntheti_biology = "http://www.synberc.org/what-is-synbio"
  end

  def education
  end

  def projects
    @klavinslab = "http://klavinslab.org/"
    @nemlab = "http://depts.washington.edu/nemlab/"
    @aquarium = "http://klavinslab.org/aquarium.html"
    @bode_plot = "http://en.wikipedia.org/wiki/Bode_plot"
  end

  def more
  end

  def about
  end
end
